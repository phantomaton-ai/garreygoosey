import script from './script.js';
import sketch from './sketch.js';
import topic from './topic.js';

const subtask = configuration => configuration.topic ? configuration.panel ?
  sketch(configuration) : script(configuration) : topic(configuration);

export default subtask;