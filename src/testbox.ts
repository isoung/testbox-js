import 'colors';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as request from 'request';

import { CLI } from './cli/cli';
import { Scaffolder } from './scaffolder';

const cachePath = path.join(__dirname + '/../../.cache');
const cacheListPath = path.join(cachePath, '/list.json');

export class TestBox {
  private cli: CLI;
  private scaffolder: Scaffolder;

  constructor() {
    this.cli = new CLI();
    this.scaffolder = new Scaffolder();
  }

  public scaffold(update: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.checkForUpdate(update)) {
        console.log('Grabbing the latest list of frameworks...'.blue);

        this.downloadFrameworks()
          .then((repos) => {
            const frameworks: any[] = repos.filter((elem) => {
              return elem['name'].match(/([^\s]+)-([^\s]+)-base/) !== null;
            });

            this.renewCache();
            this.createList(frameworks);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
      else {
        resolve();
      }
    });
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
