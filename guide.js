const instruct = ({ topic, panel }) => topic ? panel ?
  `Your goal is to generate an image for panel ${panel} of the current script.` :
  `Your goal is to use the script command to propose a script for a comic on ${topic}.` :
  'Your goal is to use the topic command to propose a new topic for this comic.';

export default instruct;
