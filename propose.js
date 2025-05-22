import metamagic from 'metamagic';

import goal from './goal.js';
import watch from './watch.js';

const regex = /^[a-z]+$/i;
const accept = body => {
  const b = body.trim();
  if (regex.test(b)) return b.toLowerCase();
  throw new Error("Expected a lowercase string");
};

const build = ({ peek, perform }) => goal(  
  'Come up with a new topic.',
  'Your goal is to use the topic command to propose a new topic for this comic.',
  peek,
  metamagic('topic', perform, {
    description: 'Propose a topic for this comic',
    attributes: {},
    body: { description: 'The topic for the comic (one single word, all lower-case)' },
    example: { attributes: {}, body: 'dining' }
  })
);

const propose = configuration => build(watch(accept));

export default propose;
