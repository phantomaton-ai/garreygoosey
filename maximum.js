const maximum = (conversation, maximum) => async () => {  
  if (conversation.turns.length >= maximum) {
    throw new Error(`Exceeded maximum tries of ${maximum}`);
  }
  return await conversation.advance();
};

export default maximum;
