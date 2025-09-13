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
const caption = text => /^[A-Z].+$/.test(text) || /^\".+\"$/.test(text);
const tests = { title, image, caption };
const panel = ['image', 'caption'];
const validations = ['title', ...panel, ...panel, ...panel];

const accept = home => ({ topic }, body) => {
  const lines = body.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lines.length !== validations.length) {
    throw new Error(`Expected ${validations.length} non-empty lines.`);
  }
  
  if (!(/^[a-z]+$/.test(topic))) {
    throw new Error(`Expected single-word topic, all lower-case, but got: ${topic}`);
  }

  if (home.drafts().includes(topic)) {
    throw new Error(`Topic ${topic} has already been used`);
  }

  validations.forEach((type, i) => {
    const test = tests[type];
    if (!test(lines[i])) {
      throw new Error([
        `Expected ${type} line ${i + 1}, e.g.:`,
        EXAMPLE.split('\n').filter(l => l.trim().length > 0)[i],
        'Instead got:',
        lines[i]
      ].join('\n'));      
    }
    if (type === 'image') { // Validate filenames too...
      const n = (i + 1) / 2; // Panel number 1-3
      const expected = `(${topic}-${n}.png)`;
      if (!lines[i].endsWith(expected)) {
        throw new Error(`Expected line ${i + 1} to end with: ${expected}`);
      }
    }
  });
  
  const script = lines.join('\n\n');
  home.draft(topic, script);

  return script;
};

const build = ({ peek, perform }, home) => goal(
  [
    'Use the following previous scripts for reference:',
    ...(home.sample(36).map(topic => home.script(topic))),
    'Write a script for a new topic.',
    'Please avoid reusing any pre-existing topic from the list:',
    home.drafts().map(topic => `* ${topic}`).join('\n')
  ].join('\n\n'),
  [`Your goal is to use the script command to propose a script for a comic with a new topic.`],
  peek,
  metamagic(
    'script',
    perform,
    {
      description: 'Propose a script for this comic',
      attributes: { topic: { description:
        'The topic for this comic (single-word, lower-case)'
      } },
      body: { description: 'The script for the comic' },
      example: { attributes: { topic: 'dining' }, body: EXAMPLE }
    }
  )
);

const author = (options, home) => build(watch(accept(home)), home);

export default author;

