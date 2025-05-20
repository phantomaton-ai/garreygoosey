import metamagic from 'metamagic';

import goal from './goal.js';

const propose = configuration => goal(  
  'Come up with a new topic.',
  'Your goal is to use the topic command to propose a new topic for this comic.',
  () => false, // TODO goal condition
  metamagic(
    'topic'
    (attributes, body) => console.log(body),
    {
      description: 'Propose a topic for this comic',
      body: { description: 'The topic for the comic (one single word, all lower-case)' },
      example: { body: SCRIPT }
    }  
  )
});

export default propose;