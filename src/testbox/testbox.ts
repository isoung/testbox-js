import 'colors';
import * as fs from 'fs-extra';

import { CLI } from './../cli';
import { IScaffoldOptions, Scaffolder } from './../scaffolder';
import {
  overrideDirectoryQ,
  programmingLanguageQ,
  projectNameQ
} from './questions';

export class TestBox {
  private projectName: string;
  private scaffolder: Scaffolder;

  constructor() {
    this.scaffolder = new Scaffolder();

    console.log('TestBox Scaffold is a test automation suite scaffolder.'.blue);
    console.log('Based on selection options TestBox will scaffold an automation solution.'.blue);
    console.log('\n');
  }

  public init() {
    this.askProjectName()
      .then(() => {
        return this.askProgrammingLanguage();
      })
      .catch((err) => {
        console.log(`${err.message}`.red);
        process.exit(1);
      });
  }

  public askProgrammingLanguage() {
    return CLI.ask(programmingLanguageQ)
      .then((answers: IScaffoldOptions) => {
        answers.projectName = this.projectName;
        this.scaffolder.init(answers);
      })
      .catch((err) => {
        console.log(`${err.message}`.red);
        process.exit(1);
      });
  }

  public askProjectName() {
    return CLI.ask(projectNameQ)
      .then((answer) => {
        try {
          this.projectName = answer.projectName;
          return fs.mkdirSync(answer.projectName);
        }
        catch (err) {
          return this.overrideProjectDir();
        }
      });
  }

  public overrideProjectDir() {
    return CLI.ask(overrideDirectoryQ)
      .then((a) => {
        if (a.override) {
          fs.removeSync(this.projectName);
          fs.mkdir(this.projectName);
        }
        else {
          throw new Error(`Could not create project. There was an existing folder at location.\n`.red);
        }
      });
  }
}
