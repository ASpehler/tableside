const CLI = require('clui');
const fs = require('fs-extra')
const simpleGit = require('simple-git');
const Spinner = CLI.Spinner;
const touch = require('touch');
const _ = require('lodash');

const inquirer = require('./inquirer');

module.exports = {
  createTestFile: async () => {
    // const filelist = _.without(fs.readdirSync('.'), '.git', 'test2.tmp');

    // if (filelist.length) {
    //   const answers = await inquirer.askPaths(filelist);

    //   if (answers.ignore.length) {
    //     fs.writeFileSync( 'test2.tmp', answers.ignore.join( '\n' ) );
    //   } else {
    //     touch( 'test2.tmp' );
    //   }
    // } else {
    //   touch('test2.tmp');
    // }

    const srcDir = '../boilerplates/meteor/meteor-react/';
    const destDir = '../src/';

    // Delete folder
    await fs.remove(destDir)
      .then(() => {
        console.log('removed!');
      })
      .catch(err => {
        console.error(err)
      })

    // create folder
    await fs.copy(srcDir, destDir).then(() => {
        console.log('done!');
      })
      .catch(err => {
        console.error(err)
      })
  },

  setupRepo: async () => {
    const status = new Spinner('Test2 git commands...');
    const git = simpleGit();
    status.start();

    try {
      // git.add('test2.tmp')
        // .then(git.commit('Initial commit'))
        // .then(git.status())
    } finally {
      status.stop();
    }
  },
};
