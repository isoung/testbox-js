import { RubyScaffolder } from './ruby';

export interface IScaffoldOptions {
  programmingLanguage: string;
}

export class Scaffolder {
  constructor() {

  }

  public init(options: IScaffoldOptions) {
    if (options.programmingLanguage === 'ruby') {
      RubyScaffolder.init(options);
    }
  }
}
