const CLI = require('clui');
const fs = require('fs-extra')
const replace = require('replace-in-file');
const Spinner = CLI.Spinner;
const _ = require('lodash');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('./inquirer');

module.exports = {
  setupRepo: async (responses) => {
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

    const toReplace = {
      NAME: responses.name,
      DESCRIPTION: responses.description,
      METEOR_RELEASE: 'METEOR@2.1',
      BUTTON: 'Button',
      CONTAINER: 'Container'
    };

    if (responses.ui === 'SemanticUI') {
      toReplace['UI'] = 'semantic-ui-react';
      toReplace['CSS_IMPORT'] = `import 'semantic-ui-css/semantic.min.css';`;
      toReplace['NPM'] = 'npm install semantic-ui-react semantic-ui-css';
    } else {
      toReplace['UI'] = 'react-bootstrap';
      toReplace['CSS_IMPORT'] = `import 'bootstrap/dist/css/bootstrap.min.css';`;
      toReplace['NPM'] = 'npm install react-bootstrap bootstrap';
    }

    toReplace['BUTTON_IMPORT'] = `import { Button } from '${toReplace['UI']}'`;
    toReplace['CONTAINER_IMPORT'] = `import { Container } from '${toReplace['UI']}'`;

    const options = {
        files: [
          '../src/.meteor/*',
          '../src/*',
          '../src/*/*',
          '../src/*/*/*',
        ],
        from: [],
        to: []
    };

    _.keys(toReplace).forEach(key => {
      options.from.push(new RegExp(`{{! ${key} !}}`, 'g'));
      options.to.push(toReplace[key]);
    });

    await replace(options)
      .then(result => {
          // console.log('Replacement results: ', result);
      })
      .catch(error => {
          console.log(error);
      });

    await exec(`cd ../src && npm install && ${toReplace['NPM']}`).then(_ => {
      console.log('npm package added!');
      status.stop();
    });
  },
};
