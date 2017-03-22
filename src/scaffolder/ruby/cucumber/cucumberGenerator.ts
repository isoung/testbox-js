import * as fs from 'fs-extra';

import { Generator } from './../../generator';
import { IRubyOptions } from './../ruby';
import {
  env,
  exampleFeatureFile,
  exampleStepDefinition,
  gemfile
} from './fileTemplates';

export class CucumberGenerator {
  public static create(options: IRubyOptions) {
    CucumberGenerator.createProjectStructure();
    Generator.createFile('GEMFILE', gemfile);
    Generator.createFile('features/support/env.rb', env);
    Generator.createFile('features/example.feature', exampleFeatureFile);
    Generator.createFile('features/stepDefinitions/sumStepDefinitions.rb', exampleStepDefinition);
  }

  public static createProjectStructure() {
    fs.mkdirSync('features');
    fs.mkdirSync('features/stepDefinitions');
    fs.mkdirSync('features/support');
  }

  public static createExamples() {
    fs.writeFile('features/example.feature',
      `Feature: Example feature file
  @exampleFeature
  Scenario: Example tests
      `
    );
  }
}
