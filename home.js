import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.join(DIRNAME, 'data', 'comics');

class Home {
  constructor(root = DEFAULT_ROOT) {
    this.root = root;
  }

  draft(topic, script) {
    const dir = path.join(this.root, topic);
    if (fs.existsSync(dir)) {
      throw new Error(`Topic ${topic} already exists.`);
    }
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${topic}.md`);
    fs.writeFileSync(file, script, 'utf-8');
  }

  drafts() {
    const filenames = fs.readdirSync(this.root);
    const topics = filenames.filter(filename => /^[a-z]+$/.test(filename));
    return topics;
  }

  sketch(topic, panel, image) {
    // TODO
  }

  script(topic) {
    const dir = path.join(this.root, topic);
    const file = path.join(dir, `${topic}.md`);
    return fs.readFileSync(file, 'utf-8');
  }

  images(topic) {
    const candidates = [1,2,3].map(i => `${topic}-${i}.png`);
    const files = candidates.map(c => path.join(this.root, topic, c));
    const existing = files.filter(f => fs.existsSync(f));
    const buffers = existing.map(f => fs.readFileSync(f));
    return buffers;
  }

  topics() {
    const file = path.join(this.root, 'topics.txt');
    const text = fs.readFileSync(file, 'utf-8');
    return text.split('\n').map(t => t.trim()).filter(t => t.length > 0);
  }
}

export default root => new Home(root);
