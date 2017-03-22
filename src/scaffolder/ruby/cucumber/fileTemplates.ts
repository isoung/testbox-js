export const env = [
  "require('rspec/expectations')\n"
];

export const exampleFeatureFile = [
  'Feature: Example feature file\n',
  '   Scenario Outline: Example tests',
  '     Given "<num1>" and "<num2>"',
  '     Then the sum should be "<sum>"\n',
  '     Scenarios: Example Scenario',
  '     | num1 | num2 | sum |',
  '     | 1    | 2    | 3   |'
];

export const exampleStepDefinition = [
  'Given(/^"([^"]*)" and "([^"]*)"$/) do |num1, num2|\n',
  '  @num1 = num1.to_i',
  '  @num2 = num2.to_i',
  'end\n',
  'Then(/^the sum should be "([^"]*)"$/) do |sum|',
  '  expect((@num1 + @num2) == sum.to_i)',
  'end'
];

export const gemfile = [
  "source 'https://rubygems.org'\n\n",
  '# Specifying required gems',
  "gem 'cucumber'",
  "gem 'rake'",
  "gem 'rspec-expectations'",
  "gem 'rubocop'"
];
