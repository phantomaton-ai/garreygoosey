import goal from './goal.js';
import introduce from './introduce.js';

// TODO: Load from home
const COMIC = `# Wet Sock

![Garrey Goosey shoves a single sock into a washing machine.](laundry-1.png)

*One sock go in.*

![Garrey Goosey watches the washing machine spin, looking confused.](laundry-2.png)

"Round and round it spinneth!"

![Garrey Goosey pulls a wet sock from the washing machine, looking frustrated.](laundry-3.png)

"O kablooney! Wet!"`;

const sketch = ({ topic, panel }) => goal(
  introduce(`Draw panel ${panel} of the following comic:\n\n${COMIC}`, []), // TODO images too
  `Your goal is to generate an image for panel ${panel} of the current script.`,
  () => false // TODO goal condition
);

export default sketch;