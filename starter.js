import chalk from 'chalk';

// TODO move debug, delay, maximum into their own decorators
const starter = (evaluate, options = {}) => async conversation => {
  const debug = true; // options.debug;
  const delay = options.delay || 60.0;
  const maximum = options.maximum || 30;
  let rounds = 0;

  while (rounds < maximum) {
    console.log(chalk.white(JSON.stringify(await conversation.user.converse(conversation.turns), null, 2)));
    const { message, reply } = await conversation.advance();
    conversation.user.preamble = conversation.assistant.preamble;
    
    if (debug) {
      console.log(chalk.green(reply));
      console.log(chalk.magenta(conversation.user.preamble));
    }

    const result = evaluate(conversation);
    if (result) {
      return result;
    }

    await new Promise(res => setTimeout(res, delay * 1000));
    rounds += 1;
  }

  throw new Error(`Exceeded maximum tries of ${maximum}`);
};

export default starter;
