import {
  filterFrameworks,
  filterLanguageDuplicates,
  queryForOptions
} from './choices';
import { validateRequires } from './validate';

const programmingLanguageQ = {
  type: 'rawlist',
  name: 'programmingLanguage',
  message: 'What programming language will the automation solution be built in?',
  choices: () => filterLanguageDuplicates(programmingLanguageQ.name)
};

const frameworkQ = {
  name: 'framework',
  type: 'rawlist',
  message: 'What framework do you want to use?',
  choices: (answers: any) => filterFrameworks(answers, frameworkQ.name)
};

const additionalOptionsQ = {
  name: 'additionalOptions',
  type: 'checkbox',
  message: 'Are there any additional options that you want?',
  choices: (answers: any) => queryForOptions(answers, additionalOptionsQ.name),
  validate: (currentAnswers: string[]) => validateRequires(currentAnswers)
};

export const frameworkQuestions = [
  programmingLanguageQ,
  frameworkQ,
  additionalOptionsQ
];
