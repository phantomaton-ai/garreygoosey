import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';

import subtask from './subtask.js';

const extensions = ({ user, commands, start }) => [
  plugins.define(conversations.user).as(user),
  plugins.define(execution.command).as(commands),
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => start(c()))  
];

export default plugins.create(
  ({ configuration }) => extensions(subtask(configuration))
);
