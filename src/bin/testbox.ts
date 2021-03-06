#!/usr/bin/env node
import * as yargs from 'yargs';

import { TestBox } from './../testbox';

const args = yargs
  .usage('Usage: $0 option')
  .option('scaffold', {
    alias: 's',
    describe: 'scaffolds an automation framework'
  })
  .option('forceUpdate', {
    alias: 'u',
    describe: 'forces an update on current list of frameworks available'
  })
  .help('help', 'displays help')
  .argv;

const testBox = new TestBox();

if (args.scaffold) {
  args.forceUpdate ? testBox.scaffold(true) : testBox.scaffold(false);
  testBox.initScaffoldCLI();
}
else {
  console.log('No option was given. You must specify one of the options [ --scaffold ]'.red);
  process.exit(1);
}
