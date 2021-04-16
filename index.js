#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const repo = require('./scripts/boilerplate');
const inquirer = require('./scripts/inquirer');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('CART CLI')
  )
);

const run = async () => {
  try {
    const responses = await inquirer.askProjectInfo();

    await repo.setupBoilerplate(responses);

    console.log(chalk.green('All done!'));
  } catch(err) {
      if (err) {
        console.log(chalk.red(err));
      }
  }
};

run();
