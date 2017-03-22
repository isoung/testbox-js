import { CLI } from './../../cli/cli';
import { CucumberGenerator } from './cucumber/cucumberGenerator';
import { frameworkQ } from './questions';

export interface IRubyOptions {
  framework: string;
}

export class RubyScaffolder {
  public init() {
    this.askFramework();
  }

  public askFramework() {
    return CLI.ask(frameworkQ, 'rubyFramework')
      .then((answers: IRubyOptions) => {
        this.evaluateAnswers(answers);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  private evaluateAnswers(options: IRubyOptions) {
    switch (options.framework) {
      case 'cucumber':
        CucumberGenerator.create(options);
      default:
        break;
    }
  }
}
