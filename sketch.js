import goal from './goal.js';
import introduce from './introduce.js';

// TODO: Load from home
const COMIC = `# Vending Gone

![Garrey Goosey stands before a vending machine, beak close to the glass.](vending-1.png)

See the treat snacks.

![Garrey Goosey presses many buttons on the vending machine at once, sweat drops flying.](vending-2.png)

"Push wrong!?"

![Garrey Goosey stares into the empty vending machine slot with wide-eyed desperation.](vending-3.png)

"O kablooney"`;

const sketch = ({ topic, panel }, home) => goal(
  introduce(`Draw panel ${panel} of the following comic:\n\n${home.script(topic)}`, []), // TODO images too
  "Good start. Now emphasize Garrey Goosey's bloodshot eyes; we want red ballpoint pen for the veins...",
  () => false // TODO goal condition
);

export default sketch;