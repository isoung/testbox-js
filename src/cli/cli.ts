import * as inquirer from 'inquirer';

import { questions } from './questions/questions';

export class CLI {

  public ask(questions: inquirer.Questions): Promise<inquirer.Answers> {
    return new Promise((resolve, reject) => {
      inquirer.prompt(questions)
        .then((answer) => {
          resolve(answer);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public createQuestions(): any {
    return questions.map((q: any) => () => this.ask(q));
  };

  public executeQuestions(q: any): Promise<any> {
    return q.reduce((promise: any, func: any) =>
      promise.then((result: any) => func().then(Array.prototype.concat.bind(result))),
      Promise.resolve([]));
  }

  public initScaffoldCLI(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.executeQuestions(this.createQuestions())
      .then((stuff) => {

        const options = {};

        for (let i = 0; i !== stuff.length; i++) {
          Object.assign(options, stuff[i]);
        }

        resolve(options);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}
