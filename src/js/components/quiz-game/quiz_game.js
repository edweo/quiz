import Question from './modules/question/question'
import QuestionAlternatives from './modules/question/questionAlternatives'
import Timer from './modules/timers/timer'
import HighScoreManager from './modules/high_score/high_score_manager'
import { convertMStoSStoString } from './modules/timers/time_converter'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
  
    :host {
        width: 100%;
    }
  
    #root {
      display: grid;
      grid-template-columns: auto auto;
      gap: 20px;
      width: 80%;
      margin: 0 auto;
      justify-content: center;
    }
    
    .game-panel {
      background-color: #000;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      width: 100%;
    }
    
    #questions-panel {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        background-color: #000;
        border-radius: 10px;
        padding: 20px;
        gap: 10px;
        width: 500px;
    }
    
    .questions-panel-row {
        display: flex;
        justify-content: start;
        align-items: start;
        gap: 10px;
        border-radius: 10px;
        width: 100%;
        background-color: #6262621f;
        padding: 5px 5px;
    }
   
    .question-answer-section {
      display: flex;
      flex-direction: column;
      word-break: break-word;
    }
    
    .question-answer {
        color: #9f9f9f;
    }
    
    .status {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        padding: 2px 10px;
        color: transparent;
        text-shadow: 0 0 0 white;
        user-select: none;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #input-section {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      width: 100%;
    }
    
    #input-div {
        display: flex;
        column-gap: 10px;
    }
    
    #input {
        background-color: #f5c216;
        border: none;
        width: 100%;
    }
    
    #title {
        text-align: start;
        margin-bottom: 10px;
    }
    
    #input-section label {
      display: flex;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      user-select: none;
    }

    #input-section input {
      border-radius: 10px;
      font-size: 25px;
      padding: 2px 10px;
      font-weight: 600;
    }

    #input-section input:focus {
      outline: none;
    }
    
    #submit-btn {
        padding: 0 10px;
        background-color: #f5c216;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
    
    #submit-btn:hover {
        background-color: #ffde6f;
    }
    
    #message {
        font-size: 13px;
        background-color: red;
        border-radius: 10px;
        padding: 2px 5px;
        width: 100%;
    }
    
    .message-success::before {
        content: '✔️';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-fail::before {
        content: '❌';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-completed-quiz::before {
        content: '🏆';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    #alternatives-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    #alternatives {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }
    
    #alternatives input {
        opacity: 0;
        pointer-events: none;
        position: fixed;
    }
    
    .alternative-label {
        background-color: #3c3c3c26;
        border-radius: 10px;
        padding: 2px 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 5px;
        user-select: none;
        word-wrap: anywhere;
        font-size: 18px;
    }
    
    .btn {
       width: 100%;
       background-color: #f5c216;
       padding: 0 10px;
       border: none;
       border-radius: 10px;
       font-size: 18px;
       cursor: pointer;
       height: 40px;
       font-weight: 600;
       color: black;
    }
    
    .btn:hover {
        background-color: #ffde6f;
    }
    
    #questions-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    
    .timer {
        background-color: #6262621f;
        padding: 2px 5px;
        border-radius: 10px;
        display: flex;
    }
    
    .timer::before {
        content: "📝";
        margin-right: 5px;
    }
    
    .question-timer {
        
    }
    
    .question-timer::before {
        content: '❔';
        color: transparent;
        text-shadow: 0 0 0 #828282;
    }
    
    .game-panel-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 10px;
        width: 100%;
    }
    
    .username-timer-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
    .username {
        color: #f5c216;
        font-weight: 600;
    }
    
    .username::before {
        content: '👤';
        color: transparent;
        text-shadow: 0 0 0 white;
    }
    
    .alternative-checked {
        background-color: #737373;
    }
    
    .high-score-panel {
      background-color: #000;
      width: 100%;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    
    .high-score-main {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .scores {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .score {
        background-color: #6262621f;
        width: 100%;
        border-radius: 10px;
        padding: 2px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .score-first-place {
        background-color: #d2b12c;
    }
    
    .score-second-place {
        background-color: silver;
    }
    
    .score-third-place {
        background-color: #f76208;
    }
    
    .high-score-title {
        text-align: center;
    }
    
    .first-place::before {
        content: '🥇';
    }
    
    .second-place::before {
        content: '🥈';
    }
    
    .third-place::before {
        content: '🥉';
    }
    
    .other-place::before {
       content: '🎗️';
    }
    
    .card-rotatable {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
        width: 450px;
        height: fit-content;
    }
    
    .card-front {
        backface-visibility: hidden;
        height: 100%;
    }
    
    .card-back {
        position: absolute;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        top: 0;
        left: 0;
        min-height: 100%;
    }
    
    .answer-panel {
        display: flex;
        flex-direction: column;
        width: inherit;
        gap: 10px;
    }
    
    .questions-in-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    
  </style>
  
  <div id="root">  
    <div id="questions-panel">
      <div id="questions-panel-header">
        <h2 id="questions-panel-title">Questions</h2>
        <div class="username-timer-section">
            <h3 class="username"></h3>
            <h2 class="timer total-time">00:00</h2>
        </div>
      </div>
      <div class="questions-in-panel"></div>
    </div>
  
    <div class="card-rotatable">
      <div class="game-panel card-front">
        <div class="answer-panel">
          <div class="game-panel-top">
            <h2 id="title">Welcome to the <br> Quiz Game 💡</h2>
            <h2 class="timer question-timer">00:00</h2>
          </div>
          
          <section id="input-section">
            <label id="label" for="input">Please provide a username</label>
            <div id="input-div">
              <input type="text" name="cardholder-name" id="input" placeholder="name">
              <button id="submit-btn">✏️</button>
            </div>
          </section>
          
          <section id="alternatives-section">
              <form id="alternatives"></form>
              <button class="btn">✏️ ANSWER</button>
          </section>
        </div>
        
        <h3 id="message"></h3>
        
        <button class="btn-restart btn">🏁 RESTART QUIZ</button>
        <button class="btn-to-score btn">🏆 HIGH SCORES</button>
      </div>
    
      <div class="high-score-panel card-back">
        <div class="high-score-main">
          <h2 class="high-score-title">High Scores 🏆</h2>
          <div class="scores"></div>
        </div>
        <button class="btn-to-quiz btn">BACK</button>
      </div>
    </div>
  </div>
`
export default class QuizGame extends HTMLElement {
  static #ENTRY_QUIZ_URL_API = 'https://courselab.lnu.se/quiz/question/1'

  // Data stateful
  #questions = []
  #username
  #isGameOver
  #nextQuestionURL
  #isQuestionTimed
  #quizStartedMS
  #quizEndedMS
  #quizTotalTimeMS
  #currentAlternatives
  #highScoreManager
  #winner

  // References HTML elements
  #titleHTML
  #labelHTML
  #inputHTML
  #submitBtnHTML
  #messageHTML
  #gamePanelHTML
  #questionsPanelHTML
  #usernameHTML
  #highScorePanelHTML
  #cardHTML
  #btnToHighScoresHTML
  #btnToQuizHTML
  #scoresHTML
  #quizRestartBtn
  #questionsInPanelHTML

  // Different Question Types Sections
  #inputSectionHTML
  #alternativesSectionHTML
  #alternativesHTML
  #alternativesBtn
  #currentAlternativeChecked

  // Timers
  #timerTotalTimeHTML
  #timerTotalTime
  #timerQuestionLimitHTML
  #timerQuestionLimit

  // On-click Functions
  #btnInputOnClick
  #btnAlternativesOnClick

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    // Starting point API calls for quiz game
    this.#nextQuestionURL = QuizGame.#ENTRY_QUIZ_URL_API

    // Game state variables
    this.#isGameOver = false
    this.#isQuestionTimed = false
    this.#highScoreManager = new HighScoreManager()
    this.#winner = false

    // Timers
    this.#timerTotalTime = new Timer()
    this.#timerQuestionLimit = new Timer()

    // References to shadow-dom elements
    this.#titleHTML = this.shadowRoot.querySelector('#title')
    this.#labelHTML = this.shadowRoot.querySelector('#label')
    this.#inputHTML = this.shadowRoot.querySelector('#input')
    this.#submitBtnHTML = this.shadowRoot.querySelector('#submit-btn')
    this.#messageHTML = this.shadowRoot.querySelector('#message')
    this.#questionsPanelHTML = this.shadowRoot.querySelector('#questions-panel')
    this.#questionsInPanelHTML = this.#questionsPanelHTML.querySelector('.questions-in-panel')
    this.#inputSectionHTML = this.shadowRoot.querySelector('#input-section')
    this.#alternativesSectionHTML = this.shadowRoot.querySelector('#alternatives-section')
    this.#alternativesHTML = this.shadowRoot.querySelector('#alternatives')
    this.#alternativesBtn = this.#alternativesSectionHTML.querySelector('.btn')
    this.#timerTotalTimeHTML = this.shadowRoot.querySelector('.total-time')
    this.#timerQuestionLimitHTML = this.shadowRoot.querySelector('.question-timer')
    this.#usernameHTML = this.shadowRoot.querySelector('.username')
    this.#cardHTML = this.shadowRoot.querySelector('.card-rotatable')
    this.#gamePanelHTML = this.shadowRoot.querySelector('.game-panel')
    this.#highScorePanelHTML = this.shadowRoot.querySelector('.high-score-panel')
    this.#btnToQuizHTML = this.#highScorePanelHTML.querySelector('.btn-to-quiz')
    this.#scoresHTML = this.#highScorePanelHTML.querySelector('.scores')
    this.#btnToHighScoresHTML = this.#gamePanelHTML.querySelector('.btn-to-score')
    this.#quizRestartBtn = this.shadowRoot.querySelector('.btn-restart')

    // Event Listeners
    this.#btnToHighScoresHTML.addEventListener('click', e => {
      e.stopPropagation()
      this.#cardHTML.style.transform = 'rotateY(180deg)'
    })

    this.#btnToQuizHTML.addEventListener('click', e => {
      e.stopPropagation()
      this.#cardHTML.style.transform = 'unset'
    })

    this.#quizRestartBtn.addEventListener('click', () => {
      this.#restartQuiz()
    })

    // Hide sections
    this.#questionsPanelHTML.style.display = 'none'
    this.#messageHTML.style.display = 'none'
    this.#alternativesSectionHTML.style.display = 'none'
    this.#timerQuestionLimitHTML.style.display = 'none'
    this.#quizRestartBtn.style.display = 'none'

    // Fetch high-scores from localStorage
    this.#updateHighScoresDOM(this.#highScoreManager.getHighScoresLocalStorageJSON())
  }

  connectedCallback () {
    this.#inputHTML.focus()
    this.#startGameAddEventListener()

    this.#inputHTML.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) { // key: Enter
        e.preventDefault()
        e.stopPropagation()
        this.#submitBtnHTML.click()
      }
    })
  }

  #startGameAddEventListener () {
    this.#submitBtnHTML.addEventListener('click', (e) => {
      e.stopPropagation()
      this.#startQuizGame(this.#inputHTML)
    }, { once: true })
  }

  /**
   * Starts the quiz game
   * @param {HTMLInputElement} inputHTML input element for username checking
   */
  #startQuizGame (inputHTML) {
    const username = inputHTML.value
    if (username.length < 1) {
      this.#startGameAddEventListener()
      return
    }

    this.#btnToHighScoresHTML.style.display = 'none'
    this.#inputHTML.placeholder = 'Answer...'
    this.#username = username
    this.#usernameHTML.textContent = username
    this.#questionsPanelHTML.style.display = 'flex'
    this.#labelHTML.textContent = 'Provide your answer'

    this.#startGameWithFirstQuestion()
  }

  /** Start the quiz by Fetching the first question */
  #startGameWithFirstQuestion () {
    this.#newQuestionRound(this.#nextQuestionURL).then(startQuestionFunc => {
      if (startQuestionFunc) {
        this.#quizStartedMS = performance.now()

        // Start Quiz Total Time Timer
        this.#timerTotalTime.startTimerIncrementing(() => {
          this.#timerTotalTimeHTML.textContent = this.#timerTotalTime.toString()
        })

        startQuestionFunc()
      }
    })
  }

  /** Restarts the quiz game back to the first question */
  #restartQuiz () {
    // Hide high-score and restart buttons
    this.#btnToHighScoresHTML.style.display = 'none'
    this.#quizRestartBtn.style.display = 'none'

    this.#timerTotalTimeHTML.textContent = '00:00'

    // Hide message
    this.#messageHTML.style.display = 'none'

    // Restart timers and quiz start ms
    this.#timerTotalTime.resetTimer()
    this.#quizStartedMS = undefined
    this.#quizEndedMS = undefined

    // Reset game-state variables
    this.#winner = false
    this.#isGameOver = false

    // Clear questions panel
    this.#questionsInPanelHTML.textContent = ''

    // Reset to first question and start fetching
    this.#nextQuestionURL = QuizGame.#ENTRY_QUIZ_URL_API
    this.#startGameWithFirstQuestion()
  }

  /**
   * Creates new HTML alternatives elements
   * @param {[]} newAlternatives newAlternatives alternatives from question fetch
   * @returns {*[]} array of alternative HTML elements
   */
  #generateNewAlternatives (newAlternatives) {
    if (!newAlternatives) return []

    // Clear previous alternatives
    this.#alternativesHTML.textContent = ''

    // Create new alternatives and append to HTML
    const alternativesLabels = []
    for (const [key, value] of Object.entries(newAlternatives)) {
      const newAlternative = this.#createNewRadioAlternative(value, key)
      const radioInput = newAlternative.firstChild

      // Add event listener radio button on enter press
      radioInput.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) { // key: Enter
          e.preventDefault()
          e.stopPropagation()
          this.#alternativesBtn.click()
        }
      })

      radioInput.addEventListener('change', (e) => {
        this.#currentAlternativeChecked.classList.remove('alternative-checked')
        const radioParent = e.target.parentElement
        radioParent.classList.add('alternative-checked')
        this.#currentAlternativeChecked = radioParent
      })

      this.#alternativesHTML.appendChild(newAlternative)
      alternativesLabels.push(newAlternative)
    }

    // Set first alternative as default checked
    const firstRadioInput = this.#alternativesHTML.firstChild.firstChild
    firstRadioInput.checked = true
    firstRadioInput.focus()
    this.#currentAlternativeChecked = firstRadioInput.parentElement
    this.#currentAlternativeChecked.classList.add('alternative-checked')

    return alternativesLabels
  }

  /**
   * Creates a radio button alternative HTML element
   * @param {string} label radio label
   * @param {string} value radio value
   * @returns {HTMLLabelElement} returns radio element
   */
  #createNewRadioAlternative (label, value) {
    const labelHTML = document.createElement('label')
    labelHTML.className = 'alternative-label'

    // Create Radio Input
    const inputRadio = document.createElement('input')
    inputRadio.type = 'radio'
    inputRadio.name = 'alternative'
    inputRadio.value = value

    // Append Radio and Label
    labelHTML.append(inputRadio, label)

    return labelHTML
  }

  /**
   * Starts a new round of question/answer in the quiz
   * @param {string} questionURL get URL question
   * @returns {Promise<any>} promise function to start the timer countdown for question
   */
  async #newQuestionRound (questionURL) {
    if (this.#isGameOver) return // safeguard to not start fetch requests if game has finished

    return await this.#getQuestion(questionURL).then(data => {
      const hasLimit = data.limit !== undefined
      const isAlternatives = data.alternatives !== undefined

      if (data) { // If response delivered data
        // Add question to the question panel
        const statusPanelRow = this.#createQuestionPanelRow(data.question)

        // Determine type of question
        let question
        if (!isAlternatives) { // Input Question
          question = new Question(data.id, data.question, data.nextURL, data.message)
          this.#resetAndShowInputSection()
          this.#addInputAnswerEventListener(this.#submitBtnHTML, question, statusPanelRow)
        } else if (isAlternatives) { // Alternatives Question
          question = new QuestionAlternatives(data.id, data.question, data.nextURL, data.message, data.alternatives)
          this.#showAlternativesSection()
          this.#currentAlternatives = this.#generateNewAlternatives(data.alternatives)
          this.#addAlternativesAnswerEventListener(this.#alternativesBtn, question, statusPanelRow)
        }

        this.#displayQuestionInUI(question)

        // return start question timer function promise
        // This is done to get better sync with the total time quiz timer, especially when starting the game
        // If this is not done, the timer is behind by ~1 second at the start of the quiz
        return () => this.#handleIsQuestionTimed(hasLimit, question, data, statusPanelRow)
      }
    }).catch(err => {
      console.log('Error fetching question:' + err)
      return null
    })
  }

  /**
   * Creates a new timer for a question
   * @param {boolean} hasLimit is question time limited (not 10s default)
   * @param {object} question question object
   * @param {object} data response data from fetch question
   * @param {HTMLElement} statusPanelRow questions statusPanel
   */
  #handleIsQuestionTimed (hasLimit, question, data, statusPanelRow) {
    if (hasLimit) {
      question.limit = data.limit
      this.#isQuestionTimed = true
      this.#startQuestionTimer(Number(data.limit), statusPanelRow)
    } else {
      this.#startQuestionTimer(10, statusPanelRow)
    }
  }

  /**
   * Starts the question timer
   * @param {number} seconds seconds to start countdown from
   * @param {HTMLElement} statusPanelRow statusPanel html element
   */
  #startQuestionTimer (seconds, statusPanelRow) {
    this.#timerQuestionLimitHTML.style.display = 'flex'
    this.#timerQuestionLimit.seconds = seconds
    this.#timerQuestionLimitHTML.textContent = this.#timerQuestionLimit.toString()
    this.#timerQuestionLimit.startTimerDecreasing(seconds, () => {
      this.#timerQuestionLimitHTML.textContent = this.#timerQuestionLimit.toString()
    }, () => {
      this.#handleGameFinishedFailTimerEnded()
      this.#statusPanelQuestionTimerRanOut(statusPanelRow)
      // Remove event listeners
      this.#submitBtnHTML.removeEventListener('click', this.#btnInputOnClick)
      this.#alternativesBtn.removeEventListener('click', this.#btnInputOnClick)
    })
  }

  /** Resets input field and shows it on the browser */
  #resetAndShowInputSection () {
    // Hide Alternatives Section
    this.#alternativesSectionHTML.style.display = 'none'
    // Show Input Section
    this.#inputSectionHTML.style.display = 'flex'
    // Reset input window
    this.#inputHTML.value = ''
    this.#inputHTML.focus()
  }

  /** Shows the question alternatives section */
  #showAlternativesSection () {
    // Hide InputSection
    this.#inputSectionHTML.style.display = 'none'
    // Show Alternatives Section
    this.#alternativesSectionHTML.style.display = 'flex'
  }

  /**
   * Displays the question's question as a title in HTML
   * @param {object} question question object
   */
  #displayQuestionInUI (question) {
    // Add the question to the questions array
    this.#questions.push(question)
    // Show question in title html
    this.#setTitle(this.#questions.at(-1).question)
  }

  /**
   * Displays error message in red
   * @param {string} message message to display
   */
  #showErrorMessage (message) {
    this.#showMessage(message)
    this.#messageHTML.style.backgroundColor = 'red'
    this.#messageHTML.className = 'message-fail'
  }

  /**
   * Displays correct message in green
   * @param {string} message message to display
   */
  #showCorrectMessage (message) {
    this.#showMessage(message)
    this.#messageHTML.style.backgroundColor = 'green'
    this.#messageHTML.className = 'message-success'
  }

  /**
   * Displays winner message after successful quiz completion
   * @param {string} message message to display
   * @param {boolean} isNewHighScore boolean if new high score
   */
  #showWinnerMessage (message, isNewHighScore) {
    isNewHighScore
      ? this.#showMessage(message + '. NEW HIGH SCORE! 🎗️')
      : this.#showMessage(message)
    this.#messageHTML.style.backgroundColor = 'orange'
    this.#messageHTML.className = 'message-completed-quiz'
  }

  /**
   * Shows message in browser
   * @param {string} message message to display
   */
  #showMessage (message) {
    this.#messageHTML.style.display = 'block'
    this.#messageHTML.textContent = message
  }

  /**
   * HTTP GET request to fetch a question
   * @param {string} url url mapping
   * @returns {Promise<any>} response promise
   */
  async #getQuestion (url) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('ERROR: Bad Request')
    }
    return await res.json()
  }

  /**
   * HTTP POST request to send an answer to a question
   * @param {string} url url mapping
   * @param {string} clientAnswer answer to send
   * @returns {Promise<Response>} response promise
   */
  async #sendAnswer (url, clientAnswer) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: clientAnswer
      })
    }
    return await fetch(url, options)
  }

  /**
   * Set's quiz game title
   * @param {object} question title of the question
   */
  #setTitle (question) {
    this.#titleHTML.textContent = question
  }

  /**
   * Returns status panel row in HTML for questions panel
   * @param {object} question question object {@link Question}
   * @returns {HTMLDivElement} html row with question
   */
  #createQuestionPanelRow (question) {
    const panelRow = document.createElement('div')
    panelRow.className = 'questions-panel-row'

    const questionAndAnswerDiv = document.createElement('div')
    questionAndAnswerDiv.className = 'question-answer-section'
    panelRow.appendChild(questionAndAnswerDiv)

    const questionTitle = document.createElement('h3')
    questionTitle.textContent = question
    questionTitle.className = 'question-title'
    questionAndAnswerDiv.appendChild(questionTitle)

    const status = document.createElement('h3')
    status.textContent = '⌛'
    status.className = 'status'
    panelRow.prepend(status)

    // this.#questionsPanelHTML.appendChild(panelRow)
    this.#questionsInPanelHTML.appendChild(panelRow)
    return panelRow
  }

  /**
   * Adds an event listener to input button
   * @param {HTMLButtonElement} btnHTML button HTML
   * @param {object} question question object {@link Question}
   * @param {HTMLElement} statusPanelRow statusPanel html
   */
  #addInputAnswerEventListener (btnHTML, question, statusPanelRow) {
    const onClick = (e) => {
      e.stopPropagation()
      const answer = this.#inputHTML.value
      if (answer.length > 0) {
        btnHTML.removeEventListener('click', onClick)
        this.#proceedSendingAnswer(btnHTML, statusPanelRow, question, answer, answer)
      }
    }

    this.#btnInputOnClick = onClick
    btnHTML.addEventListener('click', onClick)
  }

  /**
   *  Adds an event listener to alternatives button
   * @param {HTMLButtonElement} btnHTML button html
   * @param {object} question question object {@link Question}
   * @param {HTMLElement} statusPanelRow status panel html
   */
  #addAlternativesAnswerEventListener (btnHTML, question, statusPanelRow) {
    const onClick = (e) => {
      e.stopPropagation()
      const allRadioInputs = this.#alternativesHTML.querySelectorAll('.alternative-label')
      const labelAlternative = Array.from(allRadioInputs).filter(label => label.firstChild.checked === true)[0]
      const toSendAnswer = labelAlternative.firstChild.value
      const answer = labelAlternative.textContent
      if (toSendAnswer.length > 0) {
        btnHTML.removeEventListener('click', onClick)
        this.#proceedSendingAnswer(btnHTML, statusPanelRow, question, toSendAnswer, answer)
      }
    }

    this.#btnAlternativesOnClick = onClick
    btnHTML.addEventListener('click', onClick)
  }

  /**
   * Send the answer to the server
   * @param {HTMLButtonElement} btnHTML button html
   * @param {HTMLElement} statusPanelRow status panel row
   * @param {object} question question object {@link Question}
   * @param {string} toSendAnswer answer to be sent
   * @param {string} answer answer to be displayed in html
   */
  #proceedSendingAnswer (btnHTML, statusPanelRow, question, toSendAnswer, answer) {
    if (this.#isQuestionTimed) this.#timerQuestionLimit.stopTimer() // stop question timer and wait for response http
    question.setAnswer(toSendAnswer)
    this.#sendAnswer(question.nextURL, toSendAnswer).then(res => {
      res.json().then(data => {
        this.#handleSentAnswerResponse(res, data, statusPanelRow, answer)
      }).catch(err => {
        console.log('Error receiving response: ' + err)
        this.#setGameOver()
      })
    }).catch(err => {
      console.log('Error sending answer: ' + err)
      this.#setGameOver()
    })
  }

  #handleSentAnswerResponse (res, data, statusPanelRow, answer) {
    if (res.ok) {
      this.#handleCorrectAnswer(data, statusPanelRow, answer)
    } else {
      this.#handleWrongAnswer(data, statusPanelRow, answer)
    }
  }

  #checkIfLastQuestionInQuiz (resData) {
    if (resData.nextURL !== undefined) {
      this.#showCorrectMessage(resData.message)
      this.#nextQuestionURL = resData.nextURL
      this.#newQuestionRound(resData.nextURL).then(startQuestionFunc => {
        if (startQuestionFunc) startQuestionFunc()
      })
    } else {
      this.#handleGameFinishedSuccess()
    }
  }

  #handleGameFinishedSuccess () {
    this.#winner = true
    this.#setGameOver()
  }

  #handleGameFinishedFailTimerEnded () {
    this.#showErrorMessage('Question timer ran out... 🕑')
    this.#setGameOver()
  }

  #calculateQuizTimeTakenMS () {
    this.#quizEndedMS = performance.now()
    this.#quizTotalTimeMS = this.#quizEndedMS - this.#quizStartedMS
  }

  #setGameOver () {
    this.#calculateQuizTimeTakenMS()
    this.#timerTotalTime.stopTimer()
    this.#isGameOver = true
    this.#nextQuestionURL = null

    // Remove alternatives listeners
    if (this.#currentAlternatives) {
      for (const alt of this.#currentAlternatives) {
        alt.replaceWith(alt.cloneNode(true))
      }
    }

    // Show button for high scores and restart btn
    this.#btnToHighScoresHTML.style.display = 'block'
    this.#quizRestartBtn.style.display = 'block'

    // Check if finished all questions
    if (this.#winner) {
      // Check if new high score and update it before fetching high-scores from localStorage
      const isNewHighScore = this.#highScoreManager.isNewHighScore(this.#username, this.#quizTotalTimeMS)
      this.#showWinnerMessage('Nice work, you completed the quiz', isNewHighScore)

      // Update high-scores from localstorage to DOM
      if (isNewHighScore) this.#updateHighScoresDOM(this.#highScoreManager.getHighScoresLocalStorageJSON())
    }
  }

  #updateHighScoresDOM (highScoresJSON) {
    // Clear previous high-scores
    this.#scoresHTML.textContent = ''

    if (!highScoresJSON) {
      this.#scoresHTML.append('High-scores is empty. Be the first one to complete the game and get a high-score.')
      return
    }

    const highScoresArray = Object.values(highScoresJSON)
    for (let i = 0; i < highScoresArray.length; i++) {
      const username = highScoresArray[i].username
      const score = highScoresArray[i].score
      this.#addHighScoreRow(username, score, i + 1)
    }
  }

  #addHighScoreRow (username, score, placeRanking) {
    const scoreRow = document.createElement('div')
    scoreRow.className = 'score'

    const scoreName = document.createElement('h3')
    scoreName.className = 'score-name'
    scoreName.textContent = username
    scoreRow.append(scoreName)

    const scoreTime = document.createElement('h3')
    scoreTime.className = 'score-time'
    scoreTime.textContent = convertMStoSStoString(score)
    scoreRow.append(scoreTime)

    // Extra styling based on place ranking
    switch (placeRanking) {
      case 1: {
        scoreRow.classList.add('score-first-place')
        scoreName.classList.add('first-place')
        break
      }
      case 2: {
        scoreRow.classList.add('score-second-place')
        scoreName.classList.add('second-place')
        break
      }
      case 3: {
        scoreRow.classList.add('score-third-place')
        scoreName.classList.add('third-place')
        break
      }
      default: {
        scoreName.classList.add('other-place')
        break
      }
    }

    this.#scoresHTML.appendChild(scoreRow)
  }

  #handleCorrectAnswer (resData, statusPanelRow, answer) {
    this.#checkIfLastQuestionInQuiz(resData)
    this.#statusPanelQuestionSuccess(statusPanelRow, answer)
  }

  #handleWrongAnswer (resData, statusPanelRow, answer) {
    this.#setGameOver()
    this.#showErrorMessage(resData.message)
    this.#statusPanelQuestionFail(statusPanelRow, answer)
  }

  #statusPanelQuestionSuccess (statusPanelRow, answer) {
    const statusHTML = statusPanelRow.querySelector('.status')
    statusHTML.style.backgroundColor = 'green'
    statusHTML.textContent = '✔️'
    this.#appendAnswerToQuestionPanelRow(statusPanelRow, answer)
  }

  #statusPanelQuestionFail (statusPanelRow, answer) {
    const statusHTML = statusPanelRow.querySelector('.status')
    statusHTML.style.backgroundColor = 'red'
    statusHTML.textContent = '❌'
    this.#appendAnswerToQuestionPanelRow(statusPanelRow, answer)
  }

  #statusPanelQuestionTimerRanOut (statusPanelRow) {
    const statusHTML = statusPanelRow.querySelector('.status')
    statusHTML.style.backgroundColor = 'red'
    statusHTML.textContent = '⌛'
  }

  #appendAnswerToQuestionPanelRow (statusPanelRow, answer, answerColor) {
    // Answer h4
    const answerHTML = document.createElement('h4')
    answerHTML.className = 'question-answer'
    answerHTML.textContent = answer

    // Change to specific answer color if specified
    if (answerColor) answerHTML.style.color = answerColor

    // Append answer to panel
    const questionSectionDiv = statusPanelRow.querySelector('.question-answer-section')
    questionSectionDiv.appendChild(answerHTML)
  }
}

customElements.define('quiz-game', QuizGame)
