import * as inquirer from 'inquirer';

import { eventEmit } from './eventBus';
import { questions } from './questions/questions';

export let projectName: string;

export class CLI {

  public ask(questions: inquirer.Questions, eventName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      eventEmit(eventName);
      inquirer.prompt(questions)
        .then((answer) => {
          if ('projectName' in answer) {
            projectName = answer.projectName;
          }

          resolve(answer);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public createQuestions(): any {
    return questions.map((q) => () => this.ask(q, q.name));
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
