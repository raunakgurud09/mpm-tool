import inquirer from "inquirer";

import fs from "fs";
import path from "path";

// const getPath = () => {
//   console.log(process.cwd());
// };
// getPath();

const packageJsonPath = path.join(process.cwd(), "package.json");
const fileExist = fs.existsSync(packageJsonPath);

console.log(fileExist);

async function buildConfig() {
  let config = {
    version: 2,
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
  switch (answers.projectType) {
    case "node-express":
      console.log("node_express");
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
