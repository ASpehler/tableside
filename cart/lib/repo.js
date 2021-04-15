const CLI = require('clui');
const fs = require('fs');
const simpleGit = require('simple-git');
const Spinner = CLI.Spinner;
const touch = require("touch");
const _ = require('lodash');

const inquirer = require('./inquirer');

module.exports = {
  createTestFile: async () => {
    const filelist = _.without(fs.readdirSync('.'), '.git', 'test.tmp');

    if (filelist.length) {
      const answers = await inquirer.askPaths(filelist);

      if (answers.ignore.length) {
        fs.writeFileSync( 'test.tmp', answers.ignore.join( '\n' ) );
      } else {
        touch( 'test.tmp' );
      }
    } else {
      touch('test.tmp');
    }
  },

  setupRepo: async () => {
    const status = new Spinner('Test git commands...');
    const git = simpleGit();
    status.start();

    try {
      // git.add('test.tmp')
        // .then(git.commit('Initial commit'))
        // .then(git.status())
    } finally {
      status.stop();
    }
  },
};
