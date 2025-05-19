import guide from './guide.js';
import introduce from './introduce.js';

const user = options => ({
  converse: async (turns) => (turns.length < 1 ? introduce : guide)(options)
});

export default user;
