const CLI = require('clui');
const fs = require('fs-extra');
const replace = require('replace-in-file');
const Spinner = CLI.Spinner;
const _ = require('lodash');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

const exec = util.promisify(require('child_process').exec);
const UIs = {
  "SemanticUI": {...require('../modules/semanticUI-react.json')},
  "Bootstrap": {...require('../modules/bootstrap-react.json')},
  "None": {...require('../modules/none.json')}
}

module.exports = {
  setupBoilerplate: async (responses) => {
    const skeleton = `skeletons/meteor/${responses.frontend.toLowerCase()}/`;
    const srcDir = path.join(__dirname, '..', skeleton)
    const destDir = `${process.cwd()}/${responses.name}`;

    const status = new Spinner('Generating Boilerplate...');
    status.start();

    console.log(`Creating the new app in ${chalk.green(destDir)}`);

    await fs.ensureDir(destDir)
      .then(() => {
        console.log('Directoy Created');
      })
      .catch(err => {
        console.error(err)
      });

    // create folder
    await fs.copy(srcDir, destDir)
      .then(() => {
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
          `${destDir}/.meteor/*`,
          `${destDir}/*`,
          `${destDir}/*/*`,
          `${destDir}/*/*/*`,
        ],
        from: [],
        to: []
    };

    _.keys(toReplace).forEach(key => {
      if (toReplace[key]) {
        options.from.push(new RegExp(`{{! ${key} !}}`, 'g'));
        options.to.push(toReplace[key]);
      } else {
        options.from.push(new RegExp(`{{! ${key} !}}\n`, 'g'));
        options.to.push('');
      }
    });

    await replace(options)
      .then(result => {
          // console.log('Replacement results: ', result);
      })
      .catch(error => {
          console.log(error);
      });

    await exec(`cd ${destDir} && npm install ${toReplace['NPM']}`).then(_ => {
      console.log('npm package added!');
      status.stop();
    });
  },
};
