import * as inquirer from 'inquirer';
import * as request from 'request';

import { eventEmit } from './../eventBus';

const frameworks = (): any[] => {
  return require('./../../../.cache/list.json')['frameworks'];
};
export let options: any[];

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

export const queryForOptions = (answers: inquirer.Answers, event: string): Promise<IOptions[]> => {
  const gitRepos = frameworks().filter((elem) => {
    return elem.name === `${answers.programmingLanguage}-${answers.framework}-base`;
  })[0];

  return new Promise((resolve, reject) => {
    return requestOptions(gitRepos, event)
      .then((opt) => {
        options = opt;
        resolve(opt);
      });
  });
};

interface IOptions {
  name: string;
  requires?: string;
};

const validateOptions = (opt: any[], gitRepo: any): any[] => {
  const validatedOptions = opt.map((elem, index) => {
    if (!elem.hasOwnProperty('name')) {
      return {
        name: `${gitRepo.url.split('/')[4]}[option ${index + 1}]`,
        disabled: `Option was invalid, please log an issue with the base framework`
      };
    }

    return elem;
  });

  return validatedOptions;
};

const requestOptions = (gitRepo: any, event: string): Promise<IOptions[]> => {
  return new Promise((resolve, reject) => {
    request({
      url: `${gitRepo.url}/options.json`,
      headers: {
        'User-Agent': 'testbox'
      }
    }, (err, response, body) => {
      eventEmit(event);
      resolve(validateOptions(JSON.parse(body).options, gitRepo));
    });
  });
};
