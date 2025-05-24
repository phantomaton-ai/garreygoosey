const delay = (conversation, delay) => async () => {
  if (conversation.turns.length > 0) {
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
  }
  return await conversation.advance();
};

export default delay;
