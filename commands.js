const SCRIPT = `# Hot Dining

![Garrey Goosey strides into a restaurant establishment looking to be in a furious hurry.](dining-1.png)

"Hot dining!"

![Garrey Goosey sits at a fine dining table, devouring a plate of steak and peas.](dining-2.png)

*Chrunch some steak & peas.*

![Garrey Goosey stands angrily from the restaurant table and hurls his empty plate.](dining-3.png)

"All Done!?"
`;

const commands = ({ topic, panel }) => topic ? panel ? [] : [metamagic(
  'script'
  (attributes, body) => console.log(body),
  {
    description: 'Propose a script for this comic',
    body: { description: 'The script for the comic' },
    example: { body: SCRIPT }
  }
)] : [metamagic(
  'topic'
  (attributes, body) => console.log(body),
  {
    description: 'Propose a topic for this comic',
    body: { description: 'The topic for the comic (one single word, all lower-case)' },
    example: { body: SCRIPT }
  }  
)];

export default commands;