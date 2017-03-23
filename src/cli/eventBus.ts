import { EventEmitter } from 'events';

const events = new EventEmitter();

export const eventEmit = (eventName: string): void => {
  events.emit(eventName);
};

export { events };
