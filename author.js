import metamagic from 'metamagic';

import goal from './goal.js';

const EXAMPLE = `# Hot Dining

![Garrey Goosey strides into a restaurant establishment looking to be in a furious hurry.](dining-1.png)

"Hot dining!"

![Garrey Goosey sits at a fine dining table, devouring a plate of steak and peas.](dining-2.png)

*Chrunch some steak & peas.*

![Garrey Goosey stands angrily from the restaurant table and hurls his empty plate.](dining-3.png)

"All Done!?"
`;

const author = ({ topic }) => goal(  
  `Write a script for the topic: ${topic}`,
  `Your goal is to use the script command to propose a script for a comic on ${topic}.`,
  () => false, // TODO goal condition
  metamagic(
    'script',
    (attributes, body) => console.log(body),
    {
      description: 'Propose a script for this comic',
      body: { description: 'The script for the comic' },
      example: { body: EXAMPLE }
    }
  )
);

export default author;