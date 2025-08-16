/* eslint-env mocha */
import fs from 'fs';
import { expect, stub } from 'lovecraft';
import util from './util.js';
import garreygoosey from './garreygoosey.js';

const FAKE_COMIC = `# Fake Comic
![A fake image](fake-1.png)
A fake caption.
![Another fake image](fake-2.png)
Another fake caption.
![A final fake image](fake-3.png)
A final fake caption.`;

describe('garreygoosey', () => {
  let phantomatonStub;

  beforeEach(() => {
    phantomatonStub = stub(util, 'phantomaton').resolves(FAKE_COMIC);
    stub(fs, 'readFileSync').returns('a-topic');
    stub(fs, 'readdirSync').returns(['a-topic']);
  });

  afterEach(() => {
    util.phantomaton.restore();
    fs.readFileSync.restore();
    fs.readdirSync.restore();
  });

  it('should generate a valid comic', async () => {
    const comic = await garreygoosey({});
    const lines = comic.trim().split('\n');

    expect(lines).to.have.lengthOf(7);
    expect(lines[0]).to.match(/^# /);
    for (let i = 1; i < lines.length; i += 2) {
      const imageLine = lines[i];
      const captionLine = lines[i+1];
      expect(imageLine).to.match(/^!\[.*\]\(.*\)$/);
      expect(captionLine).to.not.be.empty;
    }
  });
});
