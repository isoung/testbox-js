import 'colors';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as request from 'request';

import { CLI } from './../cli/cli';
import { Scaffolder } from './../scaffolder/scaffolder';

const cachePath = path.join(__dirname + '/../../.cache');
const cacheListPath = path.join(cachePath, '/list.json');

export class TestBox {
  private cli: CLI;
  private scaffolder: Scaffolder;

  constructor() {
    this.cli = new CLI();
    this.scaffolder = new Scaffolder();

    console.log('\nTestBox Scaffold is a customizable test automation suite scaffolder.'.blue);
    console.log('Based on selection options TestBox will scaffold an automation solution.'.blue);
    console.log('\n');
  }

  public scaffold(update: boolean): Promise<any> {
    if (this.checkForUpdate(update)) {
        console.log('Grabbing the latest list of frameworks...'.blue);

        return this.downloadFrameworks()
        .then((repos) => {
          const frameworks: any[] = repos.filter((elem) => {
            return elem['name'].match(/([^\s]+)-([^\s]+)-base/) !== null;
          });

          this.renewCache();
          this.createList(frameworks);

          return this.initScaffoldCLI();
        });
    }
    else {
      return this.initScaffoldCLI();
    }
  }

  public initScaffoldCLI(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cli.initScaffoldCLI()
        .then((options) => {
          return this.scaffolder.init(options);
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err.message.red);
          process.exit(1);
        });
    });
  };

  private checkForUpdate(update: boolean): boolean {
    return (!fs.existsSync(cacheListPath) ||
      (Math.floor(new Date().getTime() / 1000 - JSON.parse(fs.readFileSync(cacheListPath, 'utf-8')).lastUpdate) > 3600) ||
      update);
  };

  private downloadFrameworks(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://api.github.com/users/isoung/repos',
        headers: {
          'User-Agent': 'testbox'
        }
      }, (err: any, response: any, body: any) => {
        if (err) { reject(err); }
        resolve(JSON.parse(body));
      });
    });
  };

  private createList(frameworks: any[]): void {
    fs.writeFileSync(cacheListPath, JSON.stringify({
      lastUpdate: Math.floor(new Date().getTime() / 1000),
      frameworks: frameworks.map((elem) => {
        return {
          name: elem.name,
          url: `https://raw.githubusercontent.com/isoung/${elem.name}/master`
        };
      })
    }));
  };

  private renewCache(): void {
    !fs.existsSync(cachePath) ? fs.mkdirsSync(cachePath) : fs.truncateSync(cacheListPath);
  };
}
