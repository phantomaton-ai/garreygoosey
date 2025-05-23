import metamagic from 'metamagic';

import goal from './goal.js';
import watch from './watch.js';

const EXAMPLE = `# Hot Dining

![Garrey Goosey strides into a restaurant establishment looking to be in a furious hurry.](dining-1.png)

"Hot dining!"

![Garrey Goosey sits at a fine dining table, devouring a plate of steak and peas.](dining-2.png)

Chrunch some steak & peas.

![Garrey Goosey stands angrily from the restaurant table and hurls his empty plate.](dining-3.png)

"All Done!?"
`;

const title = text => /^# [A-Za-z ]+$/.test(text);
const image = text => /^\!\[.*?\]\((.*?)\)$/.test(text);
const caption = text => /^[A-Z]\*.+\*$/.test(text) || /^\".+\"$/.test(text);
const tests = [title, image, caption, image, caption, image, caption];

const accept = ({ topic }, body) => {
  const lines = body.split('\n').map(line => line.trim());
  const nonempty = lines.filter(line => line.length > 0);

  if (nonempty.length !== tests.length) {
    throw new Error(`Expected ${test.length} non-empty lines.`);
  }

  tests.forEach((test, i) => {
    if (!test(nonempty[i])) {
      throw new Error(`Failed to parse line ${i}: ${nonempty[i]}`);
    }
  });

  return nonempty.join('\n\n');
};

const build = ({ peek, perform }) => goal(  
  `Write a script for a new topic.`,
  `Your goal is to use the script command to propose a script for a comic with a new topic.`,
  peek,
  metamagic(
    'script',
    perform,
    {
      description: 'Propose a script for this comic',
      attributes: {
        topic: { description: 'The topic for this comic (single-word, lower-case)' }
      },
      body: { description: 'The script for the comic' },
      example: { attributes: { topic: 'dining' }, body: EXAMPLE }
    }
  )
);

const author = () => build(watch(accept));

export default author;

