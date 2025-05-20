import introduce from './introduce.js';

const user = (instruction, guidance, extras = []) => ({
  converse: async (turns) => turns.length < 1 ? introduce(instruction, extras) : guidance
});

export default user;
