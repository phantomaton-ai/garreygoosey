import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import extras from './extras.js';
import instruct from './instruct.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const sources = [
  'chess.png',
  'fishing.png',
  'golf.png',
  'dining-1.png',
  'dining-2.png',
  'dining-3.png'
].map(filename => path.join(dirname, filename));

const introduce = (configuration) => [
  { text: "Example images are attached for your reference" },
  ...([...sources, ...extras(topic, panel)].map(source => ({
    inlineData: {
      mimeType: 'image/png',
      data: fs.readFileSync(source).toString('base64')
    }
  }))),
  { text: instruct(configuration) }
];

export default introduce;
