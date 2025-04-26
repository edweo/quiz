# Quiz

This is a quiz application that is built with HTML, CSS and JS which uses HTTP request to `https://courselab.lnu.se/quiz/`
to get questions and send answers.

[Link to Quiz Application](https://edweo.github.io/quiz/)

### Quiz Rules
- User must enter a **username** before playing
- User has **10 seconds** to answer each question
- Questions:
  - **Input**: User manually writes the answer in an input field
  - **Alternatives**: User chooses the single correct answer among given alternatives
- Questions can be **timed**, meaning the user has less than 10 seconds (usually 5-6s) to answer the question
- Quiz Game Outcomes:
  - **Successful**:
    - User answers all the answers correctly
  - **Unsuccessful**:
    - User answers a question incorrectly
    - Question timer runs out
- Top 5 fastest quiz completion times get stored in browser's **LocalStorage** as high scores

![1](https://github.com/edweo/quiz/blob/main/1.png)
![1](https://github.com/edweo/quiz/blob/main/2.png)
![1](https://github.com/edweo/quiz/blob/main/3.png)
![1](https://github.com/edweo/quiz/blob/main/4.png)
