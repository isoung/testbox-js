import * as inquirer from 'inquirer';
import * as request from 'request';

import { eventEmit } from './../eventBus';

const frameworks = (): any[] => {
  return require('./../../../.cache/list.json')['frameworks'];
};

export const filterFrameworks = (answers: inquirer.Answers, event: string) => {
  const languageSubset = frameworks().filter((elem) => {
    return elem.name.indexOf(answers.programmingLanguage) > -1;
  });

  return languageSubset.map((elem) => {
    return elem['name'].split('-')[1];
  });
};

export const filterLanguageDuplicates = (event: string) => {
  eventEmit(event);
  const languages = frameworks().map((elem) => {
    return elem['name'].split('-')[0];
  });

  return languages.filter((elem, i) => {
    return languages.indexOf(elem) === i;
  });
};

export const queryForOptions = (answers: inquirer.Answers, event: string) => {
  const gitRepos = frameworks().filter((elem) => {
    return elem.name === `${answers.programmingLanguage}-${answers.framework}-base`;
  })[0];

  return new Promise((resolve, reject) => {
    request({
      url: `${gitRepos.url}/options.json`,
      headers: {
        'User-Agent': 'testbox'
      }
    }, (err, response, body) => {
      eventEmit(event);
      resolve(JSON.parse(body).options);
    });
  });
};
