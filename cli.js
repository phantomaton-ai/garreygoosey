import garreygoosey from './garreygoosey.js';

const topic = process.argv[2];
const panel = parseInt(process.argv[3]);

try {
  console.log(await garreygoosey({ topic, panel }));
} catch (e) {
  console.log(JSON.stringify(e,null,2));
}