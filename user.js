import instruct from './instruct.js';
import introduce from './introduce.js';

class User {
  constructor(options) {
    this.introduction = introduce();
    this.instruction = instruct(options);
    this.guidance = guide(options);
  }

  async converse(turns) {
    if (turns.length === ) return [
      ...this.introduction,
      { text: this.instruction }
    ];
    return this.guidance;
  }
}