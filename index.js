#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const minimist = require('minimist');

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
    const argv = minimist(process.argv.slice(2));
    const projectName = argv._[0];

    if (projectName) {
      console.log(`Initializing ${chalk.green(projectName)}\n`);
    }

    const responses = await inquirer.askProjectInfo(projectName);

    if (projectName) {
      responses.name = projectName;
    }

    await repo.setupBoilerplate(responses);

    console.log(chalk.green('Done!\n'));
    console.log('To start the project:');
    console.log(`   cd ${chalk.green(responses.name)}`);
    console.log('   meteor\n');
    console.log(`Thank you for using ${chalk.yellow('Tableside')}`);
    console.log('Have fun with your project!\n');
  } catch (err) {
    if (err) {
      console.log(chalk.red(err));
    }
  }
};

run();
