import { dialog } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { setEditorContent, setEditorPath } from "../actions/editor";

import {
  setCurrentStep,
  setIsConnected,
  setIsConnecting,
  setIsSubmitted,
  setIsSubmitting,
  setIsRetrieved,
  setIsRetrieving,
  setIsDisconnected,
  setIsDisconnecting
} from "../actions/results";

import { store } from "../index";
import PromiseFtp from "promise-ftp";

//HACK: Bypassing react-redux to directly dispatch to store.
export function openFilePicker() {
  dialog.showOpenDialog(
    { properties: ["openFile", "createDirectory", "showHiddenFiles"] },
    function(fileNames) {
      if (fileNames && fileNames.length) {
        let fileContents = readFileSync(fileNames[0], "utf8");
        store.dispatch(setEditorContent(fileContents)); //Save content to redux
        store.dispatch(setEditorPath(fileNames[0])); //Save content to redux
        //TODO: Save current path to redux;
      }
    }
  );
}

export function newFile() {
  //TODO: Check to see if the current open file has unsaved changes
  store.dispatch(setEditorContent(""));
  store.dispatch(setEditorPath(""));
}

export function saveFile(overwrite = false) {
  let currentPath = store.getState().editor.editorPath;
  let editorContent = store.getState().editor.editorContent;
  console.log("Current Path is: ", currentPath);
  if (overwrite && currentPath) {
    writeFileSync(currentPath, editorContent);
    console.log("Saved to ", currentPath);
  } else {
    let saveAsPath = dialog.showSaveDialog();
    if (saveAsPath) {
      writeFileSync(saveAsPath, editorContent);
      console.log("Saved to ", saveAsPath);
      store.dispatch(setEditorPath(saveAsPath));
    }
    //Open SaveAs dialog
    //If SaveAs was saved, not cancelled, save the file to disk
  }
  //TODO: Check to see if the current open file has unsaved changes
}

export function testIndicators() {
  let tests = [
    () => setIsConnecting(true),
    () => setIsConnecting(false),
    () => setIsSubmitting(true),
    () => setIsSubmitting(false),
    () => setIsRetrieving(true),
    () => setIsRetrieving(false),
    () => setIsDisconnecting(true),
    () => setIsDisconnecting(false),
    () => setIsConnected(true),
    () => setIsSubmitted(true),
    () => setIsRetrieved(true),
    () => setIsDisconnected(true),
    () => setIsConnected(false),
    () => setIsSubmitted(false),
    () => setIsRetrieved(false),
    () => setIsDisconnected(false)
  ];
  tests.forEach((test, index) => {
    window.setTimeout(() => {
      store.dispatch(test());
    }, 2000 * index);
  });
}
