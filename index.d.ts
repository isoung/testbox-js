export = testbox;

declare namespace testbox {
  export interface IScaffoldOptions {
    projectName: string;
    override: boolean;
    programmingLanguage: string;
    framework: string;
    additionalOptions: string[];
  }

  export class Scaffolder {
    init(options: IScaffoldOptions): Promise<boolean>
  }
}
