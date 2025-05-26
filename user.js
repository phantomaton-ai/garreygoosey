const user = (instruction, guidance, extras = []) => ({
  converse: async (turns) => turns.length < 1 ?
    instruction :
    guidance[(turns.length - 1) % guidance.length]
});

export default user;
