#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const repo = require('./lib/repo');
const inquirer = require('./lib/inquirer');


clear();

console.log(
  chalk.yellow(
    figlet.textSync('CART CLI')
  )
);

const run = async () => {
  try {
    const responses = await inquirer.askProjectName()

    await repo.createTestFile(responses);

    // Set up local repository and push to remote
    await repo.setupRepo(responses);

    console.log(chalk.green('All done!'));
  } catch(err) {
      if (err) {
        console.log(chalk.red(err));
      }
  }
};

run();
