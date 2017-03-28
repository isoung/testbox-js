import { options } from './choices';

export const validateRequires = (currentAnswers: string[]): boolean | string => {

  for (const answer of currentAnswers) {
    const opt: any = options.filter((elem) => {
      return elem.name === answer;
    })[0];

    if (opt.hasOwnProperty('requires') && currentAnswers.indexOf(opt.requires) === -1) {
      return `${answer} requires [${opt.requires}]`;
    }
  }

  return true;
};
