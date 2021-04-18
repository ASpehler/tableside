const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => path.basename(process.cwd()),

  directoryExists: (name) => fs.existsSync(`${process.cwd()}/${name}`),
};
