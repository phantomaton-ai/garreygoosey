import history from './history.js';
const parts = history.flatMap(({parts}) => parts);
const inlines = parts.filter(({inlineData}) => inlineData);
const datas = inlines.map(({inlineData}) => inlineData.data);
const buffers = datas.map(data => Buffer.from(data, 'base64'));

import fs from 'fs';
import path from 'path';

buffers.forEach((buffer, index) => {
  fs.writeFileSync(path.resolve('png', `${index+1}.png`), buffer);
});

console.log(buffers);

