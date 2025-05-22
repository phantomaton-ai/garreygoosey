# Garrey Goosey

This repository is in a semi-complete state; it has all the basic parts of a solution, but needs to be put together.

Two things kind of work:

* `node cli.js` successfully yields a conversation with a generated topic.
* `node cli.js topic 1` successfully yields an image for Panel 1 (of a hard-coded comic script)

With a little bit of copy-paste that can work as a daily comic generator. Neat!

## Next

We would like to refactor out the copy-paste to improve the autonomy of Phantomaton's Garrey Goosey comic generation.

Notably, there is still a lot of curation necessarily to get good-to-decent comics. We would like to keep the curation, at least in the next itration; but, we'd like to streamline the curation process and factor out a lot of manual steps.

### Home

An important concept for the next generation will be the "home" directory, typically passed in as a `--home` argument at runtime. This should default to `data/comics` in the `garreygoosey` directory itself, but conventionally will be pointed toward `~/projects/garreygoosey.com/comics`; that is to say, we want to use `garreygoosey` to manage the creation of comics directly in that repository.

The layout of this directory shall include:

* `topics.txt`: An ordered listing of topics, one per line; controls the date ordering upon publication. Also useful for uniqueness checks.
* `<topic>/`: Directories are named per-topic, always a single word, all lower-case. Comic topics must be unique.
  * `<topic>.md`: The Markdown-formatted script for this topic. Validations must be applied. Note that early iterations of this format expected *italicized* narration; now, we simply use unquoted text instead. Some updates may need to be made here and there to normalize that.
  * `<topic>-<n>.png`: The panel art for the nth panel of this topic.

## Design

`garreygoosey` should function as a CLI tool as well as an importable module exposing similar functionality.

`garreygoosey` should continue to generate scripts on new topics. It should write to standard out for now.

`garreygoosey --sketch <topic> <panel>` should generate a panel image. It should read from the home directory to find the script for the specified topic (as well as any existing panels) in order to provide that information to the multimodal model used for image generation; but, it should not write to home, and should instead simply write the path to the generated image. For example, when our multimodal output includes `![Generated image](data/images/c6cae777-b7cd-4a05-a38a-7375b2c5bf68.png)` we should simply write `data/images/c6cae777-b7cd-4a05-a38a-7375b2c5bf68.png` to standard output. The `![Generated image](...)` can be used as a pattern to match upon for now.

The most important experience to cover here is `garreygoosey --serve`, which exposes a local web interface. By default, port 8080, but accept a `--port` argument.

### Web experience

Interacting with `garreygoosey --serve` should look pretty similar to `garreygoosey.com`, except everything should be manually editable, and there should be controls to request regeneration of scripts, panels, etc.

Captions, title, panel descriptions (image alt text), and topic should all be manually editable. Changing the topic should re-generate the script and panels. Nothing should be saved to home until a specific "save" button for the script pressed, which writes `<topic>.md` and appends the topic to `topics.txt` if necessary. We should generally warn before clearing any unsaved changes to the script.

We'd like to see six vertically-stacked versions of each panel by default, which should progressively populate. We should be able to individually regenerate them, or click a button above the panels to regenerate all of them from scratch (which is most useful when making big changes to the script). We mostly *don't* want to regenerate panels unless we explicitly wish to. Clicking an image should save it, resulting in it getting a decorative border.

### Content generation

When generating scripts, we should additionally seed in up to thirty-six previously-saved example scripts (from the home directory) for reference, in a randomized order. Errors should be surfaced when generated topics have already been used, or when scripts are in an incorrect format.

When generating panel images, we should include any previously-saved panels from the home directory for the relevant script, as well as the script text itself. Instructions should reiterate key features like lined notebook paper and red bloodshot eyes for completeness and consistency of style.

### Architecture

Express microsite delegating to a `phantomaton` app.
