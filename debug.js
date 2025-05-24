import chalk from 'chalk';

const debug = (conversation, debug) => async () => {
  const result = await conversation.advance();
  if (debug) {
    console.log(chalk.white(result.message));
    console.log(chalk.green(result.reply));
    console.log(chalk.magenta(conversation.assistant.preamble));
  }
  return result;
};

export default debug;
