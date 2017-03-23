import * as fs from 'fs-extra';

import { projectName } from './../cli';

const projectNameQ = {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name: ',
    default: 'current_directory'
};

const overrideDirectoryQ = {
  when: () => {
    return fs.existsSync(projectName) ? true : false;
  },
  type: 'confirm',
  name: 'override',
  message: 'Should we override the current directory? (BEWARE this will delete the current directory)',
  default: 'false'
};

const programmingLanguageQ = {
  type: 'rawlist',
  name: 'programmingLanguage',
  message: 'What programming language will the automation solution be built in?',
  choices: [
    'ruby'
  ]
};

const frameworkQ = {
  name: 'framework',
  type: 'checkbox',
  message: 'What framework do you want to use?',
  choices: [
    'cucumber'
  ]
};

export const questions = [
  projectNameQ,
  overrideDirectoryQ,
  programmingLanguageQ,
  frameworkQ
];
