import * as fs from 'fs';

import { IScaffoldOptions } from './../';

export class RubyScaffolder {
  public static init(options: IScaffoldOptions) {
    RubyScaffolder.createGemfile();
  }

  private static createGemfile() {
    fs.writeFile('GEMFILE',
`source 'https://rubygems.org'

# Specifying required gems
gem 'cucumber'
gem 'rake'
gem 'rubocop'`);
  }
}
