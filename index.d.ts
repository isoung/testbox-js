export interface IScaffoldOptions {
  projectName: string;
  override: boolean;
  programmingLanguage: string;
  framework: string;
  additionalOptions: string[];
}

export class Scaffolder {
  public init(options: IScaffoldOptions): Promise<boolean>
}
