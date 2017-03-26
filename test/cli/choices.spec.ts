import { should } from 'chai';
import * as mockRequire from 'mock-require';
import * as nock from 'nock';

import {
  filterFrameworks,
  filterLanguageDuplicates,
  queryForOptions
} from './../../src/cli/questions/choices';

describe('Choice functions', () => {

  before(() => {
    // Setting up mock data before tests
    mockRequire('./../../.cache/list.json', {
      frameworks: [
        {
          name: 'test-testbox-base',
          url: 'https://raw.githubusercontent.com/isoung/test-testbox-base/master'
        },
        {
          name: 'test-testFramework-base',
          url: 'https://raw.githubusercontent.com/isoung/test-framework-base/master'
        }
      ]
    });

    nock('https://raw.githubusercontent.com')
      .replyContentLength()
      .get('/isoung/test-testbox-base/master/options.json')
      .reply(200, JSON.stringify({
        options: [
          'testOption'
        ]
      }));
  });

  it('should be able to filter a list of frameworks from a language specification', () => {
    const filteredFrameworks: string[] = filterFrameworks({
      programmingLanguage: 'test'
    }, 'testEvent');

    should().equal(filteredFrameworks.indexOf('testbox') > -1, true, 'testbox was not found');
    should().equal(filteredFrameworks.indexOf('testFramework') > -1, true, 'testFramework was not found');
  });

  it('should be able to filter duplicate languages out', () => {
    const filteredLanguages: string[] = filterLanguageDuplicates('test');

    should().equal(filteredLanguages.length === 1, true, 'Multiple duplicate languages were not filtered out');
  });

  it('should be able to query for the correct options', () => {
    return queryForOptions({
      programmingLanguage: 'test',
      framework: 'testbox'
    }, 'test')
      .then((options: string[]) => {
        should().equal(options.indexOf('testOption') > -1, true);
      });
  });
});
