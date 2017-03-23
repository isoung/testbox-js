import { CucumberGenerator } from './cucumber/cucumberGenerator';

import { IScaffoldOptions } from './../scaffolder';

export class RubyScaffolder {
  public init(options: IScaffoldOptions) {
    this.evaluateAnswers(options);
  }

  private evaluateAnswers(options: IScaffoldOptions) {
    switch (options.framework[0]) {
      case 'cucumber':
        CucumberGenerator.generate(options);
      default:
        break;
    }
  }
}
