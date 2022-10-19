#! /usr/bin/env node

import inquirer from "inquirer";

import fs from "fs";
import path from "path";

import nodeExpress from "./config/node-express.js";
import executeCommand from "./helper/exec.js";

const packageJsonPath = path.join(process.cwd(), "package.json");
const fileExist = fs.existsSync(packageJsonPath);

async function buildConfig() {
  let config = {
    version: 1,
  };

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the project? 🤔",
      default: path.basename(process.cwd()),
    },
    {
      type: "list",
      name: "projectType",
      message: "What type of project is this",
      choices: ["node-express", "react", "vue", "static"],
    },
  ]);
  config.name = answers.name;
  config.projectType = answers.projectType;
  switch (answers.projectType) {
    case "node-express":
      config = await nodeExpress(config);
      break;
    case "react":
      console.log("react : still in beta version");
      break;
    case "vue":
      console.log("vue : still in beta version");
      break;
    case "static":
      console.log("static : still in beta version");
      break;
    default:
      break;
  }
  console.log(config);
  const confirmation = await inquirer.prompt([
    {
      type: "confirm",
      name: "finalConfirmation",
      message: "Are you okay to added these packages ?",
      default: true,
    },
  ]);

  if (confirmation.finalConfirmation) {
    var command = ` npm i ${config.dependencies.join(" ")}`;
    console.log(`installing dependencies >>`);
    await executeCommand(command);

    command = `npm i -D ${config.devDependencies.join(" ")}`;
    console.log(`installing devDependencies >>`);
    await executeCommand(command);
  } else {
    console.log("\n");
    buildConfig();
  }
}

if (fileExist) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "do you want to overwrite existing file ?",
        default: false,
      },
    ])
    .then((ans) => {
      if (ans.confirm) {
        buildConfig();
      } else {
        console.info("byeeee 👋");
      }
    });
} else {
  console.log("Initialize package.json (npm init)");
  process.exit(0);
}
