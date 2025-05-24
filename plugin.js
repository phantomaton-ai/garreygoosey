import plugins from 'phantomaton-plugins';

import decorators from './decorators.js';
import extensions from './extensions.js';
import subtask from './subtask.js';

export default plugins.create(({ configuration }) => [
  ...extensions(subtask(configuration)),
  ...decorators(configuration)
]);
