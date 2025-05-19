import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';

import commands from './commands.js';
import Starter from './starter.js';
import User from './user.js';

const commands = configuration => {
  
};

export default plugins.create(({ configuration }) => [
  plugins.define(conversations.user).as(new User(configuration)),
  plugins.define(execution.command).as(commands(configuration)),
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => new Starter(configuration).start(c()))
]);
