import * as fs from 'fs-extra';

import { eventEmit } from './../eventBus';

const projectNameQ = {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name: ',
    choices: () => eventEmit(projectNameQ.name),
    default: 'current_directory'
};

const overrideDirectoryQ = {
  when: (answers: any) => {
    return fs.existsSync(answers.projectName);
  },
  type: 'confirm',
  name: 'override',
  message: 'Should we override the current directory? (BEWARE this will delete the current directory)',
  choices: () => eventEmit(overrideDirectoryQ.name),
  default: 'false'
};

export const projectQuestions = [
  projectNameQ,
  overrideDirectoryQ
];
