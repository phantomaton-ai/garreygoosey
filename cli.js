import subtask from './subtask.js';

const topic = process.argv[2];
const panel = parseInt(process.argv[3]);

console.log(subtask({ topic, panel }));