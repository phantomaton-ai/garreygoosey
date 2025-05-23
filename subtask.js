import author from './author.js';
import home from './home.js';
import sketch from './sketch.js';

const subtask = configuration => (configuration.topic && configuration.panel) ?
  sketch(configuration, home(configuration.home)) : author(configuration);

export default subtask;