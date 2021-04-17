#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const repo = require('./scripts/boilerplate');
const inquirer = require('./scripts/inquirer');


clear();

console.log(chalk.yellow(`
  _  ◍   ◍  ◍      ____          _  _               ____              _
    \\__◍__◍__     | __ )   ___  (_)| |  ___  _ __  / ___| __ _  _ __ | |_
     \\##◍###/     |  _ \\  / _ \\ | || | / _ \\| '__|| |    / _\` || '__|| __|
      |####/      | |_) || (_) || || ||  __/| |   | |___| (_| || |   | |_
      |____.      |____/  \\___/ |_||_| \\___||_|    \\____|\\__,_||_|    \\__|
______o____o__________________________________________________________________\n`));

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
