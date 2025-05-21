import fs from 'fs';
import path from 'path';
import phantomaton from 'phantomaton';
import { fileURLToPath } from 'url';

import plugin from './plugin.js';

const install = [
  'phantomaton-conversations',
  'phantomaton-execution',
  'phantomaton-gemini',
  'phantomaton-system'
];

const promptfile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'garreygoosey.md'
);

export default (options) => phantomaton(
  fs.readFileSync(promptfile, 'utf-8'),
  {
    install: [...install, plugin(options)],
    configurations: {
      'phanomaton-gemini': {
        modalities: ['TEXT', 'IMAGE'],
        model: 'gemini-2.0-flash-preview-image-generation'
      }
    }
  }
);