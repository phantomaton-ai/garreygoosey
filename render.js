
import fs from 'fs';
import * as glob from 'glob';
import { marked } from 'marked';
import metamagic from 'metamagic';
import necronomicon from 'necronomicon';
import path from 'path';
import phantasia from 'phantasia';

const BUILT = 'built';
const SOURCES = 'sources';

const TEMPLATE = body => `<html>
<head>
<title>Garrey Goosey comics</title>
</head>
<body>
${body}
</body>
</html>`

const PREPROMPT = "((An amateurish cartoon line drawing in blue ink, drawn with a ballpoint pen on wrinkled lined notebook paper.))";
const POSTPROMPT = "Garrey Goosey is a cartoon goose who wears jean shorts. Garrey Goosey has wild, blood-shot eyes. Garrey Goosey has teeth like a saw blade.";

const commands = [metamagic(
  'image',
  async ({ file }, prompt) => {
    const output = path.join(SOURCES, file);
    if (!fs.existsSync(output)) {
      await phantasia(
        [PREPROMPT, prompt, POSTPROMPT].join('\n\n'),
        { output, width: 960, height: 960 }
      );
    }
    return `![${prompt}](${file})\n`;
  },
  {
    attributes: {
      file: {
        description: 'The name of the PNG file to write.'
      }
    },
    body: {
      description: 'A prompt describing the image, to be used for image generation.'
    }
  }
)];

const spellbook = necronomicon({ commands, includes: {
  directives: false,
  promises: true,
  text: true
} });

const sources = glob.globSync(path.join(SOURCES, '**', '*.md'));

for (const source of sources) {
  const text = fs.readFileSync(source, 'utf-8');
  const executed = await spellbook.execute(text);
  const parsed = marked.parse(executed);
  const templated = TEMPLATE(parsed);
  const destination = source.replace(SOURCES, BUILT).replace(/\.md$/, '.html');
  fs.writeFileSync(destination, templated, 'utf-8');
}

const images = glob.globSync(path.join(SOURCES, '**', '*.png'));

for (const image of images) {
  const target = image.replace(SOURCES, BUILT);
  fs.copyFileSync(image, target);
}
