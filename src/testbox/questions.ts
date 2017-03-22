export const projectNameQ = {
    type: 'input',
    name: 'projectName',
    message: 'Enter your project name: '
};

export const programmingLanguageQ = {
  type: 'rawlist',
  name: 'programmingLanguage',
  message: 'What programming language will the automation solution be built in?',
  choices: [
    'ruby'
  ]
};

export const overrideDirectoryQ = {
  type: 'confirm',
  name: 'override',
  message: 'Should we override the current directory? (BEWARE this will delete the current directory)',
  default: 'false'
};
