import metamagic from 'metamagic';

import goal from './goal.js';
import watch from './watch.js';

const EXAMPLE = `# Hot Dining

![Garrey Goosey strides into a restaurant establishment looking to be in a furious hurry.](dining-1.png)

"Hot dining!"

![Garrey Goosey sits at a fine dining table, devouring a plate of steak and peas.](dining-2.png)

*Chrunch some steak & peas.*

![Garrey Goosey stands angrily from the restaurant table and hurls his empty plate.](dining-3.png)

"All Done!?"
`;

const title = text => /^# [0-9a-z ]+$/.test(text);
const image = text => /^\!\[.*?\]\((.*?)\)$/.test(text);
const caption = text => 
  /^\*[A-Za-z ]+\*$/.test(text) || /^\"[A-Za-z ]+\"$/.test(text);
const tests = [title, image, caption, image, caption, image, caption];

const accept = (attributes, body) => {
  const lines = body.split('\n').map(line => line.trim());
  const nonempty = lines.filter(line => line.length > 0);
  if (
    nonempty.length === tests.length &&
    tests.every((test, i) => test(nonempty[i]))
  ) {
    return nonempty.join('\n\n');
  }
  throw Error(`Expected script format to match example:\n\n${EXAMPLE}`);
};

const build = (topic, { peek, perform }) => goal(  
  `Write a script for the topic: ${topic}`,
  `Your goal is to use the script command to propose a script for a comic on ${topic}.`,
  peek,
  metamagic(
    'script',
    perform,
    {
      description: 'Propose a script for this comic',
      attributes: {},
      body: { description: 'The script for the comic' },
      example: { attributes: {}, body: EXAMPLE }
    }
  )
);

const author = ({ topic }) => build(topic, watch(accept));

export default author;