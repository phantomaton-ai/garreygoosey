import metamagic from 'metamagic';
import conversations from 'phantomaton-conversations';
import plugins from 'phantomaton-plugins';
import execution from 'phantomaton-execution';

import introduce from './introduce.js';

class User {
  constructor({ topic, panel }) {
    
  }

  converse(turns) {
    if (turns.length === 0) return introduce();
  }
}

export default plugins.create(({ configuration }) => [
  plugins.define(conversations.user).as(new User(configuration)),
  plugins.define(execution.command).as(commands(configuration)),
  plugins.define(plugins.start).with(
    conversations.conversation
  ).as((c) => () => new Starter(configuration).start(c()))
]);
