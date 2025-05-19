import introduce from './introduce.js';

const topic = process.argv[2];
const panel = parseInt(process.argv[3]);

console.log(introduce({ topic, panel }));