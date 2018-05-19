import Promise from "bluebird";
import { refreshDatasets } from "../actions/datasets";
import { setExplorerContent } from "../actions/explorer";
import { loadJobResults, refreshJobs } from "../actions/jobs";
import {
  setIsConnected,
  setIsConnecting,
  setIsDisconnected,
  setIsDisconnecting,
  setIsRetrieved,
  setIsRetrieving,
  setIsSubmitted,
  setIsSubmitting
} from "../actions/results";
import { store } from "../index";

import PromiseFtp from "promise-ftp";

class JES {
  public ftp: any;
  public connectionStatus: string;
  constructor() {
    this.ftp = new PromiseFtp();
    this.connectionStatus = "";
    // bind all the things here
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.setFiletype = this.setFiletype.bind(this);
    this.setEncoding = this.setEncoding.bind(this);
    this.pollJobStatus = this.pollJobStatus.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
    this.listDatasets = this.listDatasets.bind(this);
    this.listMembers = this.listMembers.bind(this);
    this.retrieveMember = this.retrieveMember.bind(this);
    this._errorLookup = this._errorLookup.bind(this);
    this._sleep = this._sleep.bind(this);
  }

  // Connect if not already connected
  public connect() {
    if (this.ftp.getConnectionStatus() !== "connected") {
      store.dispatch(setIsConnecting(true));
      store.dispatch(setIsConnected(false));
      return this.ftp
        .connect({
          host: store.getState().config.hostName,
          password: store.getState().config.ftpPassword,
          port: store.getState().config.ftpPort,
          user: store.getState().config.ftpUserName
        })
        .then(msg => console.log(msg))
        .then(() => {
          if (this.ftp.getConnectionStatus() === "connected") {
            store.dispatch(setIsConnecting(false));
            store.dispatch(setIsConnected(true));
          }
        })
        .catch(err => this._errorLookup(err));
    } else {
      // return promise that resolves immediately
      return Promise.resolve("Already connected");
    }
  }

  public async disconnect() {
    this.connectionStatus = this.ftp.getConnectionStatus();
    console.log("Attempting to disconnect");
    this.ftp
      .end()
      .then(msg => console.log(msg))
      .catch(err => this._errorLookup(err));
    // .then(async () => {
    this.connectionStatus = this.ftp.getConnectionStatus();
    console.log("Connection Status: ", this.connectionStatus);
    if (this.connectionStatus === "disconnecting") {
      store.dispatch(setIsDisconnecting(true));
    }
    let numTries = 10;
    while (this.connectionStatus === "disconnecting" && numTries > 0) {
      await this._sleep(2000);
      this.connectionStatus = this.ftp.getConnectionStatus();
      console.log("Connection Status: ", this.connectionStatus);
      numTries--;
    }
    if (numTries === 0) {
      console.log(
        "Failed to gracefully disconnect from the server, so forcing destroy"
      );
      this.ftp.destroy();
      this.connectionStatus = this.ftp.getConnectionStatus();
      console.log("Connection Status: ", this.connectionStatus);
    }
    // Clear all indicators
    store.dispatch(setIsConnected(false));
    store.dispatch(setIsConnecting(false));
    store.dispatch(setIsSubmitted(false));
    store.dispatch(setIsSubmitting(false));
    store.dispatch(setIsRetrieved(false));
    store.dispatch(setIsRetrieving(false));
    store.dispatch(setIsDisconnected(false));
    store.dispatch(setIsDisconnecting(false));
  }

  public setFiletype(filetype) {
    const acceptableFileTypes = ["jes", "seq"];
    if (acceptableFileTypes.includes(filetype)) {
      // if (store.getState().isConnected === false) this.connect();
      return this.ftp
        .site("FILETYPE=" + filetype)
        .then(resultsObj => {
          console.log(
            "Server responded to FILETYPE=jes with " +
              resultsObj.code +
              " " +
              resultsObj.text
          );
        })
        .catch(err => this._errorLookup(err));
    }
  }

  public setEncoding(type) {
    const acceptableFileTypes = ["ascii"];
    if (acceptableFileTypes.includes(type)) {
      switch (type) {
        case "ascii":
          return this.ftp.ascii().then(res => {
            console.log(res);
            console.log(JSON.stringify(res));
          });
        default:
          return;
      }
    }
  }

  // Get all JES jobs and return as an array of objects;

  public pollJobStatus() {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    this.connect()
      .then(() => this.setEncoding("ascii"))
      .then(() => this.setFiletype("jes"))
      .then(() => this.ftp.list(""))
      .then(results => {
        console.log("Checking results of list: ", results);
        // Because the mainframe returns an information message if the queue is empty,
        // this is an error
        if (!results || results.length === 0) {
          throw new Error(
            "Unable to retrieve jobs from the mainframe JES Queue."
          );
        }
        // The mainframe will provide an informational string back if no jobs are found.
        // We need to explicitly check for this and any other such informational messages.
        else if (results[0] === "No jobs found on Held queue") {
          store.dispatch(refreshJobs({}));
          store.dispatch(setIsSubmitting(false));
          store.dispatch(setIsRetrieving(false));
        } else {
          const jobs = {};
          results.forEach(job => {
            const jobSplit = job.trim().split(/\ +/);
            const jobID = jobSplit[1];
            jobs[jobID] = {
              fullString: job.trim(),
              jobID,
              numberOfSpoolFiles: job.includes("Spool Files")
                ? jobSplit[3]
                : undefined,
              owner: jobSplit[0],
              status: jobSplit[2]
            };
          });
          store.dispatch(refreshJobs(jobs));
          store.dispatch(setIsSubmitting(false));
          store.dispatch(setIsRetrieving(false));
        }
      })
      .catch(err => this._errorLookup(err));
  }

  public deleteJob(jobID) {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    return this.connect()
      .then(msg => this.setEncoding("ascii"))
      .then(msg => console.log("After setting encoding to ASCII: ", msg))
      .then(msg => this.setFiletype("jes"))
      .then(msg => console.log("After setting filetype to JES: ", msg))
      .then(msg => this.ftp.delete(jobID))
      .then(res => {
        store.dispatch(setIsSubmitting(false));
        store.dispatch(setIsRetrieving(false));
        console.log(`After invoking delete on ${jobID}: ${res}`);
      })
      .catch(err => this._errorLookup(err));
  }

  // TODO: Put returns an empty array, but we expect a string output containing job
  // control data such as the job ID. This is probably not getting handled properly
  // by the underlying promise-ftp library, but it's possible that I'm not using
  // the correct command

  // A job can be a buffer, a file, and others????
  // Buffer.from(store.getState().editor.editorContent)
  // TODO: Check and ensure JES mode and ASCII

  public submitJob(job) {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    return this.connect()
      .then(msg => this.setEncoding("ascii"))
      .then(msg => console.log("After setting encoding to ASCII: ", msg))
      .then(msg => this.setFiletype("jes"))
      .then(msg => console.log("After setting filetype to JES: ", msg))
      .then(msg => this.ftp.put(job, "/"))
      .then(res => {
        store.dispatch(setIsSubmitting(false));
        store.dispatch(setIsRetrieving(false));
        console.log(`After invoking put on ${job}: ${res}`);
      })
      .catch(err => this._errorLookup(err));
  }

  // The x suffix seems to be needed to retrieve a printout of the jobs output;
  public retrieveJob(jobID) {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    return this.connect()
      .then(msg => this.setEncoding("ascii"))
      .then(msg => console.log("After setting encoding to ASCII: ", msg))
      .then(msg => this.setFiletype("jes"))
      .then(msg => console.log("After setting filetype to JES: ", msg))
      .then(msg => this.ftp.get(jobID + ".x"))
      .then(stream => {
        console.log(`After invoking get on ${jobID}:`);
        // stream.once('close', resolve);
        // stream.once('error', reject);
        let results = "";
        stream.on("data", chunk => {
          console.log(`Received ${results.length} bytes of data.`);
          results += chunk.toString();
        });
        stream.on("end", () => {
          console.log("final output:\n" + results);
          store.dispatch(loadJobResults(jobID, results));
          store.dispatch(setIsSubmitting(false));
          store.dispatch(setIsRetrieving(false));
        });
      })
      .catch(err => this._errorLookup(err));
  }

  public listDatasets() {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    let datasets: any[] = [];
    return this.connect()
      .then(() => this.setEncoding("ascii"))
      .then(() => this.setFiletype("seq"))
      .then(() => this.ftp.list(""))
      .then(results => {
        console.log("Checking results of list: ", results);
        if (!results || results.length === 0) {
          throw new Error("Unable to list datasets.");
        }
        results.shift(); // Filter out the first row, which is table headers
        // const highLevelQualifier = store.getState().config.ftpUserName + ".";
        results.forEach(dataset => {
          const datasetSplit = dataset.trim().split(/\ +/);
          const volume = datasetSplit[0];
          const unit = datasetSplit[1];
          const referred = datasetSplit[2];
          const ext = datasetSplit[3];
          const used = datasetSplit[4];
          const recfm = datasetSplit[5];
          const lrecl = datasetSplit[6];
          const blksz = datasetSplit[7];
          const dsorg = datasetSplit[8];
          // let dsname = highLevelQualifier + datasetSplit[9];
          const dsname = datasetSplit[9];
          datasets.push({
            attributes: {
              blksz,
              dsname,
              dsorg,
              ext,
              lrecl,
              recfm,
              referred,
              unit,
              used,
              volume
            },
            children: [],
            name: dsname,
            toggled: false
          });
        });
        console.log(datasets);
      })
      .then(() => {
        return Promise.each(datasets, dataset => {
          return this.listMembers(dataset.attributes.dsname, datasets).then(
            results => {
              console.log("_datasets is: ", results);
              datasets = results;
            }
          );
        });
      })
      .then(() => {
        store.dispatch(refreshDatasets(datasets));
        store.dispatch(setIsSubmitting(false));
        store.dispatch(setIsRetrieving(false));
      })
      .catch(err => this._errorLookup(err));
  }

  // This actually populates the members in each dataset
  public listMembers(dsname, datasets) {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    console.log("Connection: ", this.ftp.getConnectionStatus());
    console.log(`list the members for ${dsname}`);
    return (
      this.connect()
        .then(msg => this.setEncoding("ascii"))
        .then(msg => this.setFiletype("seq"))
        .then(msg => this.ftp.pwd())
        .then(msg => console.log("After pwd: ", msg))
        .then(() => this.ftp.cwd(dsname))
        .then(msg => console.log("After cwd: ", msg))
        .then(() => this.ftp.list(""))
        .then(res => {
          console.log(res);
          res.shift(); //
          return res.forEach(member => {
            const memberSplit = member.trim().split(/\ +/);
            const name = memberSplit[0] || "";
            const vvmm = memberSplit[1] || "";
            const created = memberSplit[2] || "";
            const changed = memberSplit[3] || "";
            const size = memberSplit[4] || "";
            const init = memberSplit[5] || "";
            const mod = memberSplit[6] || "";
            const id = memberSplit[7] || "";
            const dsorg = memberSplit[8] || "";
            console.log({
              changed,
              created,
              dsorg,
              id,
              init,
              mod,
              name,
              size,
              vvmm
            });
            console.log(dsname);
            const index = datasets.findIndex(dataset => {
              return dataset.attributes.dsname === dsname;
            });
            console.log("index is: ", index);
            datasets[index].children.push({
              attributes: {
                changed,
                created,
                dsname,
                dsorg,
                id,
                init,
                mod,
                name,
                size,
                vvmm
              },
              name
            });
          });
        })
        .catch(err => console.log(err)) // "Error: No Members Found is returned if nothing is found"
        // MVS treats the home directory as the high-level-qualifier set to the z/OS userid
        .then(() => this.ftp.cwd("~"))
        .then(msg => {
          console.log("After cwd: ", msg);
          store.dispatch(setIsSubmitting(false));
          store.dispatch(setIsRetrieving(false));
        })
        .catch(err => this._errorLookup(err))
        .then(() => datasets)
    );
  }

  public retrieveMember(datasetName, memberName) {
    store.dispatch(setIsSubmitting(true));
    store.dispatch(setIsRetrieving(true));
    console.log(`Retrieving member ${memberName} from dataset ${datasetName}`);
    return this.connect()
      .then(() => this.setEncoding("ascii"))
      .then(msg => console.log("After setting encoding to ASCII: ", msg))
      .then(() => this.setFiletype("seq"))
      .then(() => this.ftp.cwd("~"))
      .then(msg => console.log("After cwd: ", msg))
      .then(() => this.ftp.cwd(datasetName))
      .then(msg => console.log("After cwd: ", msg))
      .then(() => this.ftp.get(memberName))
      .then(stream => {
        console.log(`After invoking get on ${memberName}:`);
        let results = "";
        stream.on("data", chunk => {
          console.log(`Received ${results.length} bytes of data.`);
          results += chunk.toString();
        });
        stream.on("end", () => {
          console.log("final output:\n" + results);
          store.dispatch(setExplorerContent(results));
          store.dispatch(setIsSubmitting(false));
          store.dispatch(setIsRetrieving(false));
        });
      })
      .catch(err => this._errorLookup(err))
      .finally(() => this.ftp.cwd("~"));
  }

  // Private Helper Functions

  private _errorLookup(err) {
    store.dispatch(setIsSubmitting(false));
    store.dispatch(setIsRetrieving(false));
    console.log("BUG DETECTED");
    console.log("Connection: ", this.ftp.getConnectionStatus());
    if (err.code) {
      switch (err.code) {
        case 451:
          // alert("File Error. Do you have a valid file open in the editor?");
          console.log(err);
          break;
        case 550:
          // alert("Permission Denied (or No such file or folder):\n", err.toString());
          console.log(err);
          break;
        case "Error: PASS command failed(…)":
          // alert("What is a PASS command?");
          break;
        default:
          console.log("|", err, "|");
        // console.log(err.parse(':'));
        // alert(JSON.stringify(err));
      }
    } else {
      console.log(err.toString());
      console.log("Just in Case: ", JSON.stringify(err));
    }
  }

  // --------------------------------------------------------------------------------------------------
  // _pollMostRecentJobUntilComplete
  //     - maxRetries: The Number of times to poll job status before giving up
  //     - timeToWait: The amount of time in ms that we should wait between retries
  //
  //     - RETURNS mostRecentJob
  //
  // Repeatedly poll job status until the most recent job has a status of output, signifying that
  // batch processing is complete. When complete, return the status of the most recent job to
  // allow for follow on action.
  //
  // TODO: Each iteration of the loop recalculates what the mostRecentJob is. This needs to target
  // the same JES Job ID.
  //
  // TODO: Assuming escalated privileges on the current User ID, it is possible that the output of
  // _pollJobStatus returns other user's jobs. Based on the workflow of this function, we should
  // really treat the most recent job as the most recent job submitted by the user. Perhaps this
  // should be handled in _pollJobStatus via an optional flag.
  //
  // --------------------------------------------------------------------------------------------------

  // private async _pollMostRecentJobUntilComplete(maxRetries, timeToWait) {
  //   console.log("Attempting to get most recent job");
  //   let mostRecentJob;
  //   while (
  //     !mostRecentJob ||
  //     (mostRecentJob.status !== "OUTPUT" && maxRetries > 0)
  //   ) {
  //     console.log("TriesRemaining: ", maxRetries);
  //     const jobs: Promise<any[]> = await this.pollJobStatus();
  //     // If we don't know the most recent job, we guestimate based on the job with the highest JOB ID
  //     // This should only run once, as it's possible that we submit another job while this one is processing
  //     if (!mostRecentJob) {
  //       const compareJobIDs = (firstJobID, secondJobID) => {
  //         const firstNum = parseInt(firstJobID.substring(3), 10);
  //         const secondNum = parseInt(secondJobID.substring(3), 10);
  //         if (firstNum > secondNum) {
  //           return 1;
  //         } else if (firstNum < secondNum) {
  //           return -1;
  //         } else {
  //           // Equality shouldn't be possible, but included just to prevent blow-ups
  //           return 0;
  //         }
  //       };
  //       const jobIDs = Object.keys(jobs).sort(compareJobIDs);
  //       const mostRecentJobID = jobIDs[jobIDs.length - 1];
  //       mostRecentJob = jobs[mostRecentJobID];
  //     }
  //     // If we're already guestimated what the most recent job is, just refresh it from the output
  //     else {
  //       mostRecentJob = jobs(mostRecentJob.jobID);
  //     }
  //     if (mostRecentJob.status === "OUTPUT") {
  //       console.log("Most recent job has status of OUTPUT, so returning");
  //       return mostRecentJob;
  //     }
  //     this._sleep(timeToWait);
  //     maxRetries--;
  //   }
  //   return mostRecentJob;
  // }

  private _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const jes = new JES();
export default jes;

// accepts 'jes'
