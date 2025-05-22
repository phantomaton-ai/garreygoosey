import author from './author.js';
import propose from './propose.js';
import sketch from './sketch.js';

const subtask = configuration => (configuration.topic && configuration.panel)
  ? sketch(configuration) : author(configuration);

export default subtask;