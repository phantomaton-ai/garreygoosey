const instruct = ({ topic, panel }) => topic ? panel ?
  `Draw panel ${panel + 1}` :
  `Write a script for the topic: ${topic}` :
  'Come up with a new topic.';

export default instruct;