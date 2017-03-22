import { CLI } from './../../cli';
import { CucumberGenerator } from './cucumber/cucumberGenerator';
import { questions } from './questions';

export interface IRubyOptions {
  framework: string;
}

export class RubyScaffolder {
  public init() {
    CLI.ask(questions)
    .then((answers: IRubyOptions) => {
      this.evaluateAnswers(answers);
    })
    .catch((err) => {
      console.log(`${err.message}`.red);
      process.exit(1);
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
