import 'colors';

import { RubyScaffolder } from './ruby';

export interface IScaffoldOptions {
  programmingLanguage: string;
  projectName: string;
}

export class Scaffolder {

  public init(options: IScaffoldOptions) {
    process.chdir(options.projectName);
    if (options.programmingLanguage === 'ruby') {
      const rubyScaffolder = new RubyScaffolder();
      rubyScaffolder.init();
    }
  }
}
