#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const repo = require('./lib/repo');
const inquirer = require('./lib/inquirer');


clear();

console.log(
  chalk.yellow(
    figlet.textSync('Ginit', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  try {
    // Retrieve & Set Authentication Token
    await inquirer.askGithubCredentials()

    // Create .gitignore file
    await repo.createGitignore();

    // Set up local repository and push to remote
    await repo.setupRepo();

    console.log(chalk.green('All done!'));
  } catch(err) {
      if (err) {
        switch (err.status) {
          case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            break;
          case 422:
            console.log(chalk.red('There is already a remote repository or token with the same name'));
            break;
          default:
            console.log(chalk.red(err));
        }
      }
  }
};

run();
