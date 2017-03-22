import { should } from 'chai';
import * as fs from 'fs-extra';

import { TestBox } from './../../src/testbox/testbox';

const stdin = require('mock-stdin').stdin();

describe('TestBox', () => {
  const testBox = new TestBox();

  it('should successfully create a folder with the project name', () => {
    if (fs.existsSync('testProj')) {
      fs.removeSync('testProj');
    }

    process.nextTick(() => {
      stdin.send('testProj\n');
    });

    return testBox.askProjectName()
      .then(() => {
        should().equal(fs.existsSync('testProj'), true, 'Project folder was not successfully created');
        fs.removeSync('testProj'); // Clean up
      });
  });
});
