import fs from 'fs';
import path from 'path';
import phantomaton from 'phantomaton';
import { fileURLToPath } from 'url';

import plugin from './plugin.js';

export default (options) => phantomaton(
  fs.readFileSync(path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'garreygoosey.md'
  ), 'utf-8'),
  {
    install: [
      'phantomaton-conversations',
      'phantomaton-execution',
      'phantomaton-gemini',
      'phantomaton-system',
       plugin(options)
    ],
    configurations: {
      'phantomaton-gemini': {
        modalities: ['TEXT', 'IMAGE'],
        model: 'gemini-2.0-flash-preview-image-generation'
      }
    }
  }
);
