import 'colors';
import * as fs from 'fs-extra';

import { RubyScaffolder } from './ruby/ruby';

export interface IScaffoldOptions {
  projectName: string;
  override: boolean;
  programmingLanguage: string;
  framework: string;
  frameworkOptions: string[];
}

export class Scaffolder {

  public init(options: IScaffoldOptions) {
    this.createProjectFolder(options.projectName, options.override);
    process.chdir(options.projectName);

    if (options.programmingLanguage === 'ruby') {
      const rubyScaffolder = new RubyScaffolder();
      rubyScaffolder.init(options);
    }
  }

  private createProjectFolder(projectName: string, override: boolean) {
    if (!fs.existsSync(projectName) || override) {
      fs.mkdirsSync(projectName);
    }
    else {
      throw new Error('Could not create project. There was an existing folder at location.\n'.red);
    }
  }
}
