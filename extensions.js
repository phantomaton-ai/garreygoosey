import conversations from 'phantomaton-conversations';
import execution from 'phantomaton-execution';
import plugins from 'phantomaton-plugins';

const extensions = ({ user, commands, start }) => [
  plugins.define(conversations.user).as(user),
  plugins.define(execution.command).as(commands),
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => start(c()))
];

export default extensions;