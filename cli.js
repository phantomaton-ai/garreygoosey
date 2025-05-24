import garreygoosey from './garreygoosey.js';

const flags = process.argv.slice(2).filter(arg => arg.startsWith('-'));
const nonflags = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

const debug = flags.includes('--debug');
const [ topic, panel ] = nonflags;

try {
  console.log(await garreygoosey({ debug, topic, panel }));
} catch (e) {
  console.log('ERROR', e, JSON.stringify(e,null,2));
}