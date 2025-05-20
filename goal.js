import metamagic from 'metamagic';

import starter from './starter.js';
import user from './user.js';

const goal = (
  instruction,
  guidance,
  evaluate,
  command
) => ({
  user: user(instruction, guidance),
  commands: command ? [command] : [],
  start: starter(evaluate)
});

export default goal;
