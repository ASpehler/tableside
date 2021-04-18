#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');

const repo = require('./scripts/boilerplate');
const inquirer = require('./scripts/inquirer');


clear();

console.log(chalk.yellow(`
    ◍   ◍  ◍     _____     _     _           _     _
   \\___◍__◍_/   |_   _|_ _| |__ | | ___  ___(_) __| | ___
    |######|      | |/ _\` | '_ \\| |/ _ \\/ __| |/ _\` |/ _ \\
    |######|      | | (_| | |_) | |  __/\\__ \\ | (_| |  __/
    |______|      |_|\\__,_|_.__/|_|\\___||___/_|\\__,_|\\___|
____o______o_________________________________________________\n`));

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
