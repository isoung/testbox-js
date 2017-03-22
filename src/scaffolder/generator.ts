import * as fs from 'fs-extra';

export class Generator {
  public static createFile(file: string, fileContents: string[]) {
    fs.writeFileSync(file, fileContents[0]);
    for (let i = 1; i !== fileContents.length; i++) {
      fs.appendFileSync(file, `${fileContents[i]}\n`);
    }
  }
}
