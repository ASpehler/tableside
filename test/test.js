/* eslint-disable no-undef */
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const repo = require('../scripts/boilerplate');

describe('NPM Install', () => {
  ['React', 'Apollo'].forEach((frontend) => {
    ['SemanticUI', 'Bootstrap', 'None'].forEach((ui) => {
      const name = path.join('test', 'tmp', `${frontend}-${ui}`);
      it(`project sucessfuly created with ${frontend} and ${ui}`, async () => {
        const success = await repo.setupBoilerplate({ frontend, ui, name });
        assert.strictEqual(success, true);
        fs.rm(path.join(process.cwd(), name), { recursive: true })
      })
    });
  });
});
