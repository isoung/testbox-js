import { should } from 'chai';
import * as fs from 'fs-extra';

import { CLI } from './../../src/cli/cli';
import { projectQuestions } from './../../src/cli/questions/projectQ';
import { input } from './../helper';

describe('Project questions', () => {
  const cli: CLI = new CLI();
  const testDir: string = 'testProj';

  it('should prompt an override question if project dir already exists', () => {
    fs.mkdirsSync(testDir);

    input(projectQuestions[0].name, testDir);
    input(projectQuestions[1].name, 'y');

    return cli.ask(projectQuestions as any)
      .then((answers) => {
        should().equal(answers.override, true, 'Override question was not prompted when expected');
        fs.removeSync(testDir);
      });
  });

  it('should not prompt an override question if project dir does not exist', () => {
    input(projectQuestions[0].name, testDir);

    return cli.ask(projectQuestions as any)
      .then((answers) => {
        should().not.exist(answers.override, 'Override question was prompted when not expected');
      });
  });
});
