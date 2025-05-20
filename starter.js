import chalk from 'chalk';

// TODO move debug, delay, maximum into their own decorators
const starter = (evaluate, options = {}) => async () => {
  const debug = options.debug;
  const delay = options.delay || 0.5;
  const maximum = options.maximum || 30;
  let rounds = 0;

  while (rounds < maximum) {
    const { message, reply } = await conversation.advance();
    conversation.user.preamble = conversation.assistant.preamble;
    
    if (this.debug) {
      console.log(chalk.white(message));
      console.log(chalk.green(reply));
      console.log(chalk.magenta(conversation.user.preamble));
    }

    const result = this.evaluate(conversation);
    if (result) {
      return result;
    }

    await new Promise(res => setTimeout(res, this.delay * 1000));
    rounds += 1;
  }

  throw new Error(`Exceeded maximum tries of ${this.maximum}`);
};

export default starter;
