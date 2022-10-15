#! /usr/bin/env node

import { exec } from "node:child_process";
import loading from "loading-cli";

const load = loading({
  text: "loading packages...",
  color: "yellow",
  interval: 100,
  stream: process.stdout,
  frames: ["◰", "◳", "◲", "◱"],
});

// const command = array.join(' ');

// run the `ls` command using exec
const executeCommand = (command = "node --version") => {
  console.log(command);
  load.start();
  exec(`${command}`, (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
      // log and return if we encounter an error
      load.stop();
      console.error("could not execute command: ", err);
      process.exit(0);
      // return;
    }
    // log the output received from the command
    load.stop();
    console.log("\nOutput:\n", output);
  });
};

export default executeCommand;
