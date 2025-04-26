# Quiz Game Component
This is a component that let's a player play a quiz game by using get/post HTTP request to `https://courselab.lnu.se/quiz/*`.

The quiz game starts off by the player entering a `username` which starts the quiz game by giving 10 seconds per question as a default timer, 
some questions have a time limit that is lower than 10s (usually 5-6s).

## Different Question Types:
- **Input Question**: type freely the answer in an input field
- **Alternatives Selection**: select the correct alternative from a radio buttons group

## LocalStorage and High Scores
- The top 5 high-scores measured by least amount of seconds taken get stored in the browser's local storage.
