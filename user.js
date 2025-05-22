import introduce from './introduce.js';

const user = (instruction, guidance, extras = []) => ({
  converse: async (turns) => turns.length < 1 ? instruction : guidance
});

export default user;
