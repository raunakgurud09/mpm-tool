import inquirer from "inquirer";

import fs from "fs";
import path from "path";

import nodeExpress from "./config/node-express.js";
import executeCommand from "../helper/exec.js";

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
      console.log("react");
      break;
    case "vue":
      console.log("vue");
      break;
    case "static":
      console.log("static");
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
    executeCommand("npm --version");
  } else {
    console.log('\n')
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
  buildConfig();
}
