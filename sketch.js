import goal from './goal.js';
import introduce from './introduce.js';

const PREFIX = `Remember Garrey Goosey's character design and comic aesthetics:

* Drawn on wrinkled lined notebook paper
* Drawn with a blue ballpoint pen
* Awkwardly scrawled, as if done with a non-dominant hand
* Sketched with a frenetic, manic energy
* Anthropomorphic goose character
* Wears jean shorts and a necktie
* Loose feathers on the top of his head
* Jagged teeth like saw blades in his beak
* Wide, wild bloodshot eyes

Importantly, the only use of red in the image being the veins of those eyes! Everything else is drawn with blue pen.

`;

const suggestions = [
  'Good, now use red ballpoint pen to emphasize the veins in Garrey Goosey\'s bloodshot eyes.',
  'Make sure the lined notebook paper in the background looks really wrinkly.',
  'Excellent, now make sure the saw blade teeth look really pointy in that beak.',
  'Nice work. Please clarify the jean shorts.',
  'Looking good. Make the necktie really flap around now.',
  'Wonderful. Please also give that wild path of feathers on top of Garrey\'s head a bit more wildness.'
];

const prefix = '![Generated image](';
const suffix = ')';
const maybe = array =>
  array.length > 0 ? array[array.length - 1] : undefined;
const output = conversation => maybe(conversation.turns.flatMap(
  ({ reply }) => reply.split('\n').filter(
    line => line.startsWith(prefix) && line.endsWith(suffix)
  ).map(line => line.slice(prefix.length, -suffix.length))
));

const sketch = ({ topic, panel }, home) => goal(
  introduce(
    `${PREFIX}Draw panel ${panel} of the following comic:\n\n${home.script(topic)}`,
    home.images(topic).filter((b, i) => panel > (i + 1))
  ),
  suggestions,
  conversation => {
    const image = output(conversation);
    home.sketch(topic, panel, image)
    return image;
  }
);

export default sketch;