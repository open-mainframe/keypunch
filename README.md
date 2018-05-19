# Keypunch

<p align="center">
<img  src='./resources/images/Keypunch Icon.png'/>
</p>
Keypunch is a lightweight text editor designed to accelerate the ease of learning core IBM Mainframe languages like COBOL, PL/I, or z/Architecture Assembler by providing a dynamic hot reloading experience similar to Code School or Codecademy. Aspiring mainframe software engineers develop in an Ace 9 powered code editor, and by clicking a single easy button, Keypunch uses the `mainframe job` package to submit the code as a batch job to the z/OS Job Entry Subsystem. The editor allows querying of job status and retrieval of the job report when complete. Additionally, a user can inspect z/OS data sets and members as if they were files and directories. By shortening the feedback loop, Keypunch hopes to accelerate the learning process of junior mainframe developers.

Because all client and Node.js logic is encapsulated in a single Electron app, Keypunch can run on corporate laptops behind the firewall. Because it uses `mainframe-job` to abstract away the details of interfacing with the mainframe's Job Entry Subsystem, Keypunch supports the long-tail of back-leveled z/OS systems.

While this is a work in progress focused on delivering an initial MVP, this app offers a foundational platform that could potentially be enhanced to provide features such as:

* Syntax highlighting for PL/1, COBOL, REXX, FORTRAN, HLASM, etc.
* Add support alternate alternate JES APIs or alternate batch processing environments, such as JES 3 or z/VSE, by enhancing to the `mainframe-job` package
* Enhancement to render alternate types of datasets

## Getting Started

1.  [Install Node if needed](https://nodejs.org/en/download/)
2.  Run the following commands:

```bash
git clone https://github.com/open-mainframe/keypunch.git
cd keypunch
npm install
npm start
```

## To Build Apps

Run `npm run dist` to generate Linux, Mac, and Windows installers in `./dist`
