import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as objectHash from 'object-hash';
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

  public init(options: IScaffoldOptions): Promise<boolean> {
    this.createProjectFolder(options.projectName, options.override);
    process.chdir(options.projectName);

    return new Promise((resolve, reject) => {
      const tarball = `${objectHash(options)}.tgz`;

      request({
        url: this.generateUrl(options.programmingLanguage, options.framework),
        headers: {
          'User-Agent': 'testbox'
        }})
        .pipe(fs.createWriteStream(tarball))
        .on('close', () => {
          this.unpackTarball(tarball);
          this.buildOptions(this.generateOptionFlags(options.additionalOptions, ''));
          resolve(true);
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

  private unpackTarball(tarball: string): void {
    execSync(`tar -xvf ${tarball} --strip 1 > /dev/null 2>&1`);
    fs.removeSync(tarball);
  }

  private buildOptions(optionString: string): void {
    execSync('npm install'); // Install any local dependencies for build script
    execSync(`node build.js ${optionString} --clean`);
  }

  private generateOptionFlags(options: string[], currentFlags: string): string {
    const flags = options.length === 0 ? currentFlags : `${currentFlags} --${options[0]}`;
    return options.length === 0 ? flags : this.generateOptionFlags(options.slice(1, options.length), flags);
  }
}
