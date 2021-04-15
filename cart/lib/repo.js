const CLI = require('clui');
const fs = require('fs-extra')
const simpleGit = require('simple-git');
const replace = require('replace-in-file');
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

    const srcDir = '../boilerplates/meteor/skel-react/';
    const destDir = '../src/';

    const status = new Spinner('Generating Boilerplate...');
    status.start();

    // Delete folder
    await fs.remove(destDir)
      .then(() => {
        console.log('Previous version removed!');
      })
      .catch(err => {
        console.error(err)
      });

    // create folder
    await fs.copy(srcDir, destDir).then(() => {
        console.log('Boilerplate generated!');
        status.stop();
      })
      .catch(err => {
        console.error(err)
      });

    const METEOR_RELEASE = 'METEOR@2.1';

    const options = {
        files: "../src/.meteor/*",
        from: [/{{! METEOR_RELEASE !}}/g],
        to: [METEOR_RELEASE]
    };

    replace(options)
      .then(result => {
          console.log("Replacement results: ",result);
      })
      .catch(error => {
          console.log(error);
      });
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
