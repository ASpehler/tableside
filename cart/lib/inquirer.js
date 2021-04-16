const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askProjectName: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:'
      },
      {
        type: 'list',
        name: 'frontend',
        message: 'Which frontend do you want to use:',
        choices: [ 'React', 'Apollo' ],
        default: 'React'
      },
      {
        type: 'list',
        name: 'ui',
        message: 'Which UI do you want to use:',
        choices: [ 'None', 'SemanticUI', 'Bootstrap' ],
        default: 'None'
      }
    ];
    return inquirer.prompt(questions);
  },

  askPaths: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you want to include:',
        choices: filelist,
        default: ['node_modules']
      }
    ];
    return inquirer.prompt(questions);
  },
};
