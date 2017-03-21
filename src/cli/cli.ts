import * as inquirer from 'inquirer';

export class CLI {
  constructor() {

  }

  public ask(questions: inquirer.Questions): Promise<inquirer.Answers> {
    return inquirer.prompt(questions);
  }
}
