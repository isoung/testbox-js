import * as yargs from 'yargs';

import { TestBox } from './../testbox/testbox';

const args = yargs
  .usage('Usage: $0 option')
  .option('scaffold', {
    alias: 's',
    describe: 'scaffolds an automation framework'
  })
  .help('help', 'displays help')
  .argv;

const testBox = new TestBox();

if (args.scaffold) {
  testBox.scaffold();
}
