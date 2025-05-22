import goal from './goal.js';
import introduce from './introduce.js';

const sketch = ({ topic, panel }) => goal(
  introduce(`Draw panel ${panel}`, []), // TODO include script for topic?
  `Your goal is to generate an image for panel ${panel} of the current script.`,
  () => false // TODO goal condition
);

export default sketch;