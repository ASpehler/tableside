const inquirer = require('inquirer');
const files = require('./directories');

module.exports = {
  askProjectInfo: (projectName) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for your project:',
        default: files.getCurrentDirectoryBase(),
        validate(value) {
          if (value.length) {
            return true;
          }

          return 'Please enter a name for your project.';
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
