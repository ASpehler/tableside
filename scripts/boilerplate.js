const CLI = require('clui');
const fs = require('fs-extra');
const replace = require('replace-in-file');

const { Spinner } = CLI;
const util = require('util');
const chalk = require('chalk');
const path = require('path');

const exec = util.promisify(require('child_process').exec);

const semanticUI = require('../modules/semanticUI-react.json');
const bootstrap = require('../modules/bootstrap-react.json');
const none = require('../modules/none.json');

const UIs = {
  SemanticUI: { ...semanticUI },
  Bootstrap: { ...bootstrap },
  None: { ...none },
};

module.exports = {
  setupBoilerplate: async (responses) => {
    const skeleton = `skeletons/meteor/${responses.frontend.toLowerCase()}/`;
    const srcDir = path.join(__dirname, '..', skeleton);
    const destDir = `${process.cwd()}/${responses.name}`;

    const status = new Spinner('Creating directories');
    status.start();

    console.log(`Creating the project in ${chalk.green(destDir)}`);

    await fs.ensureDir(destDir)
      .catch((err) => {
        status.message(err);
      });

    status.message('Generating boilerplate');

    await fs.copy(srcDir, destDir)
      .catch((err) => {
        status.message(err);
        process.exit(0);
      });

    const base = {
      NAME: responses.name,
      DESCRIPTION: responses.description,
      METEOR_RELEASE: 'METEOR@2.1',
    };

    const toReplace = {
      ...base,
      ...UIs[responses.ui],
    };

    const options = {
      files: [
        `${destDir}/.meteor/*`,
        `${destDir}/*`,
        `${destDir}/*/*`,
        `${destDir}/*/*/*`,
      ],
      from: [],
      to: [],
    };

    Object.keys(toReplace).forEach((key) => {
      if (toReplace[key]) {
        options.from.push(new RegExp(`{{! ${key} !}}`, 'g'));
        options.to.push(toReplace[key]);
      } else {
        options.from.push(new RegExp(`{{! ${key} !}}\n`, 'g'));
        options.to.push('');
      }
    });

    await replace(options)
      .catch((error) => {
        status.message(error);
        process.exit(0);
      });

    status.message('Installing npm packages');

    await exec(`cd ${destDir} && npm install ${toReplace.NPM}`).then(() => {
      status.stop();
    });
  },
};
