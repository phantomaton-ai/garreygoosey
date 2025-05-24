import garreygoosey from './garreygoosey.js';

const flags = process.argv.slice(2).filter(arg => arg.startsWith('-'));
const nonflags = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

const debug = flags.includes('--debug');

const prefix = '--home=';
const home = flags.find(flag => flag.startsWith(prefix))?.slice(prefix.length);

const [ topic, panel ] = nonflags;

try {
  console.log(await garreygoosey({ debug, home, topic, panel }));
} catch (e) {
  console.log('ERROR', e, JSON.stringify(e,null,2));
}