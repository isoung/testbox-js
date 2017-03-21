import 'colors';

import { CLI } from './../cli';
import { IScaffoldOptions, questions, Scaffolder } from './../scaffolder';

export class TestBox {
  private cli: CLI;
  private scaffolder: Scaffolder;

  constructor() {
    this.cli = new CLI();
    this.scaffolder = new Scaffolder();

    console.log('TestBox Scaffold is a test automation suite scaffolder.'.blue);
    console.log('Based on selection options TestBox will scaffold an automation solution.'.blue);
    console.log('\n');
  }

  public init() {
    this.cli.ask(questions)
      .then((answers: IScaffoldOptions) => {
        this.scaffolder.init(answers);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
