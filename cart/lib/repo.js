const CLI = require('clui');
const fs = require('fs-extra')
const simpleGit = require('simple-git');
const replace = require('replace-in-file');
const Spinner = CLI.Spinner;
const touch = require('touch');
const _ = require('lodash');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('./inquirer');

module.exports = {
  createTestFile: async (responses) => {
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
      })
      .catch(err => {
        console.error(err)
      });

    let UI, CSS_IMPORT, NPM;

    if (responses.ui === 'SemanticUI') {
      UI = 'semantic-ui-react';
      CSS_IMPORT = `import 'semantic-ui-css/semantic.min.css';`;
      NPM = 'npm install semantic-ui-react semantic-ui-css';
    } else {
      UI = 'react-bootstrap';
      CSS_IMPORT = `import 'bootstrap/dist/css/bootstrap.min.css';`;
      NPM = 'npm install react-bootstrap bootstrap';
    }

    const METEOR_RELEASE = 'METEOR@2.1';
    const BUTTON_IMPORT = `import { Button } from '${UI}'`;
    const BUTTON = 'Button';
    const CONTAINER_IMPORT = `import { Container } from '${UI}'`;
    const CONTAINER = 'Container';

    const options = {
        files: [
          '../src/.meteor/*',
          '../src/*',
          '../src/*/*',
          '../src/*/*/*',
        ],
        from: [
          /{{! METEOR_RELEASE !}}/g,
          /{{! CSS_IMPORT !}}/g,
          /{{! BUTTON_IMPORT !}}/g,
          /{{! BUTTON !}}/g,
          /{{! CONTAINER_IMPORT !}}/g,
          /{{! CONTAINER !}}/g
        ],
        to: [
          METEOR_RELEASE,
          CSS_IMPORT,
          BUTTON_IMPORT,
          BUTTON,
          CONTAINER_IMPORT,
          CONTAINER
        ]
    };

    await replace(options)
      .then(result => {
          // console.log('Replacement results: ', result);
      })
      .catch(error => {
          console.log(error);
      });

    await exec(`cd ../src && npm install && ${NPM}`).then(_ => {
      console.log('npm package added!');
      status.stop();
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
