const CLI = require('clui');
const fs = require('fs-extra')
const replace = require('replace-in-file');
const Spinner = CLI.Spinner;
const _ = require('lodash');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const UIs = {
  "SemanticUI": {...require('../modules/semanticUI-react.json')},
  "Bootstrap": {...require('../modules/bootstrap-react.json')},
  "None": {...require('../modules/none.json')}
}

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
        console.error(err);
      });

    // create folder
    await fs.copy(srcDir, destDir).then(() => {
        console.log('Boilerplate generated!');
      })
      .catch(err => {
        console.error(err)
      });

    const base = {
      NAME: responses.name,
      DESCRIPTION: responses.description,
      METEOR_RELEASE: 'METEOR@2.1'
    };

    let toReplace = {
      ...base,
      ...UIs[responses.ui]
    };

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

    await exec(`cd ../src && npm install ${toReplace['NPM']}`).then(_ => {
      console.log('npm package added!');
      status.stop();
    });
  },
};
