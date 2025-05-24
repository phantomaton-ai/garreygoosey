import conversations from 'phantomaton-conversations';

import debug from './debug.js';
import delay from './delay.js';
import maximum from './maximum.js';

const decorator = (fn, option) => conversations.conversation.decorator([
], () => conversation => turns => {  
  const c = conversation(turns);
  const c2 = Object.create(c);
  c2.advance = fn(c, option);
  return c2;
});

const decorators = (options) => [
  decorator(debug, options.debug),
  decorator(delay, options.delay || 20.0),
  decorator(maximum, options.maximum || 8)
];

export default decorators;

