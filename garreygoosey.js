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
      ...(
        options.topic && options.panel ?
        [] : ['phantomaton-execution']
      ),
      'phantomaton-gemini',
      'phantomaton-system',
       plugin(options)
    ],
    configurations: {
      'phantomaton-gemini': (options.topic && options.panel) ? {
        modalities: ['TEXT', 'IMAGE'],
        model: 'gemini-2.0-flash-preview-image-generation',
        systemless: true
      } : {
        model: 'gemini-2.5-flash-preview-04-17'
      }
    }
  }
);
