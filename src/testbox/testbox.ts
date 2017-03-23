import 'colors';

import { CLI } from './../cli/cli';
import { Scaffolder } from './../scaffolder/scaffolder';

export class TestBox {
  private cli: CLI;
  private scaffolder: Scaffolder;

  constructor() {
    this.cli = new CLI();
    this.scaffolder = new Scaffolder();

    console.log('\nTestBox Scaffold is a test automation suite scaffolder.'.blue);
    console.log('Based on selection options TestBox will scaffold an automation solution.'.blue);
    console.log('\n');
  }

  public scaffold() {
    this.cli.initScaffoldCLI()
      .then((options) => {
        this.scaffolder.init(options);
      })
      .catch((err) => {
        console.log(err.message.red);
        process.exit(1);
      });
  }
}
