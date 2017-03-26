import { execSync } from 'child_process';
import 'colors';
import * as fs from 'fs-extra';
import * as request from 'request';

export interface IScaffoldOptions {
  projectName: string;
  override: boolean;
  programmingLanguage: string;
  framework: string;
  additionalOptions: string[];
}

export class Scaffolder {
  private gitUrl: string = 'https://github.com/isoung';

  public init(options: IScaffoldOptions) {
    this.createProjectFolder(options.projectName, options.override);
    process.chdir(options.projectName);

    return new Promise((resolve, reject) => {
      request({
        url: this.generateUrl(options.programmingLanguage, options.framework),
        headers: {
          'User-Agent': 'testbox'
        }})
        .pipe(fs.createWriteStream('ruby-cucumber-base.tgz'))
        .on('close', () => {
          this.unpackTarball();
          this.buildOptions(this.generateOptionFlags(['testing', 'capybara', 'pokemon', 'masters'], ''));
          resolve();
        });
    });
  }

  private createProjectFolder(projectName: string, override: boolean): void {
    if (!fs.existsSync(projectName) || override) {
      fs.removeSync(projectName);
      fs.mkdirsSync(projectName);
    }
    else {
      throw new Error('Could not create project. There was an existing folder at location.\n'.red);
    }
  }

  private generateUrl(lang: string, framework: string): string {
    return `${this.gitUrl}/${lang}-${framework}-base/tarball/master`;
  }

  private unpackTarball(): void {
    execSync('tar -xvf ruby-cucumber-base.tgz --strip 1 > /dev/null 2>&1', () => {
      fs.removeSync('ruby-cucumber-base.tgz');
    });
  }

  private buildOptions(optionString: string): void {
    execSync(`node build.js ${optionString}`);
  }

  private generateOptionFlags(options: string[], currentFlags: string): string {
    const flags = options.length === 0 ? currentFlags : `${currentFlags} --${options[0]}`;
    return options.length === 0 ? flags : this.generateOptionFlags(options.slice(1, options.length), flags);
  }
}
