import garreygoosey from './garreygoosey.js';

const topic = process.argv[2];
const panel = parseInt(process.argv[3]);

console.log(await garreygoosey({ topic, panel }));