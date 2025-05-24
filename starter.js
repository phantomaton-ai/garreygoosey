const starter = evaluate => async conversation => {
  let result = undefined;
  while (!result) {
    await conversation.advance();
    result = evaluate(conversation);
  }
  return result;
};

export default starter;
