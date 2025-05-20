import goal from './goal.js';

const topic = ({ topic, panel }) => goal(  
  `Draw panel ${panel}`, // TODO include script for topic?
  `Your goal is to generate an image for panel ${panel} of the current script.`,
  () => false // TODO goal condition
});
