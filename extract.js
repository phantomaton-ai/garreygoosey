import fs from 'fs';

import req from './req.js'

const topic = process.argv[2];

const parts = req.contents.flatMap(({parts})=>parts);
const datas = parts.filter(({inlineData})=>inlineData).map(({inlineData})=>inlineData.data);
const tail = datas.slice(datas.length - 3);
const bufs = tail.map(data => Buffer.from(data, 'base64'));

bufs.forEach((b,i) => fs.writeFileSync(`${topic}-${i+1}.png`, b));
