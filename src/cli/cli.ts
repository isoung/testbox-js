import * as inquirer from 'inquirer';

import { eventEmit } from './../testbox/eventBus';

export class CLI {
  public static ask(questions: inquirer.Questions, eventName: string): Promise<inquirer.Answers> {
    eventEmit(eventName);
    return inquirer.prompt(questions);
  }
}
