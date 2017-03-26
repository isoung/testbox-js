import { events } from './../src/cli/eventBus';

const stdin = require('mock-stdin').stdin();

export const input = (eventName: string, consoleInput: string) => {
  events.once(eventName, () => {
    setTimeout(() => {
      stdin.send(`${consoleInput}\n`);
    }, 10);
  });
};
