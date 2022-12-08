import inquirer from "inquirer";

const packages = {
  dependencies: [
    "express",
    "dotenv",
    "mongoose",
    "axios",
    "lodash",
    "prisma",
    "express-fileupload",
    "bcryptjs",
    "cloudinary",
    ""
  ],
  devDependencies: ["nodemon", "eslint", "typescript"],
};

async function nodeExpress(config) {
  const answer = await inquirer.prompt([
    {
      type: "checkbox",
      name: "dependencies",
      message: "Choose all the dependencies",
      choices: packages.dependencies,
    },
    {
      type: "checkbox",
      name: "devDependencies",
      message:
        "choose all devDependencies (dependencies used in development only)",
      choices: packages.devDependencies,
    },
  ]);
  return {
    ...config,
    ...answer,
  };
}

export default nodeExpress;
