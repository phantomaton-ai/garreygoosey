import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const sources = [
  'chess.png',
  'fishing.png',
  'golf.png',
  'dining-1.png',
  'dining-2.png',
  'dining-3.png',
  'carousel-1.png',
  'carousel-2.png',
  'carousel-3.png'
].map(filename => path.join(dirname, filename));

const introduce = (instruction, home, panels) => [
  { text: fs.readFileSync('garreygoosey.md', 'utf-8') },
  { text: "Example images are attached for your reference" },
  ...([...sources].map(source => ({
    inlineData: {
      mimeType: 'image/png',
      data: fs.readFileSync(source).toString('base64')
    }
  }))),
  ...(home.sample(3).flatMap(topic => [
    { text: home.script(topic) },
    ...(home.images(topic).map((buffer, i) => ({
      inlineData: {
        mimeType: 'image/png',
        data: buffer.toString('base64')
      }      
    })))
  ])),
  ...(panels.flatMap((buffer, i) => ([{
    text: `Panel ${i + 1} of the current comic:`
  }, {
    inlineData: { mimeType: 'image/png', data: buffer.toString('base64') }
  }]))),
  { text: instruction }
];

export default introduce;
