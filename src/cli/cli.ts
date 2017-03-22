import * as inquirer from 'inquirer';

export class CLI {
  public static ask(questions: inquirer.Questions): Promise<inquirer.Answers> {
    return inquirer.prompt(questions);
  }
}
