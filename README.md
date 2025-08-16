# Garrey Goosey Comic Generator

This project uses generative AI to create comics featuring the character Garrey Goosey, an anthropomorphic goose with a penchant for existential dread and poorly executed tasks.

The comics are generated in Markdown format and follow a strict 3-panel structure with specific stylistic guidelines.

## Installation

To install the necessary dependencies, run:

```bash
npm install
```

## Usage

You can generate a comic from the command line.

To generate a random comic:
```bash
node cli.js
```

This will output a comic in Markdown format to the console.

### Advanced Usage

You can use command-line arguments to control the output.

- `--home=<directory>`: Specify a directory to output the generated comic.
- `topic`: The topic of the comic.
- `panel`: The specific panel to generate.

**Example: Create a new comic script in a specific directory**
```bash
node cli.js --home=../garreygoosey.com/comics
```

**Example: Generate a specific panel for a topic**
```bash
node cli.js --home=../garreygoosey.com/comics stone 3
```
This will generate the third panel for a comic about "stone".

## Running Tests

This project uses the `lovecraft` testing framework. To run the tests, execute:

```bash
npm test
```
The tests will verify that the comic generator produces a structurally valid comic.
