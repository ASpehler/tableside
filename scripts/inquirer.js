const inquirer = require('inquirer');
const directories = require('./directories');

module.exports = {
  askProjectInfo: (projectName) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for your project:',
        default: directories.getCurrentDirectoryBase(),
        validate(value) {
          if (!value.length) {
            return 'Please enter a name for your project';
          }

          const directoryExists = directories.directoryExists(value);
          if (directoryExists) {
            return 'Directory already exist';
          }

          return true;
        },
      },
      {
        type: 'list',
        name: 'frontend',
        message: 'Which frontend do you want to use:',
        choices: ['React', 'Apollo'],
        default: 'React',
      },
      {
        type: 'list',
        name: 'ui',
        message: 'Which UI do you want to use:',
        choices: ['None', 'SemanticUI', 'Bootstrap'],
        default: 'None',
      },
    ];

    if (projectName) {
      questions.shift();
    }

    return inquirer.prompt(questions);
  },
};
