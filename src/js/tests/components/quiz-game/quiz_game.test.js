// @vitest-environment jsdom
import QuizGame from '../../../components/quiz-game/quiz_game.js'
import { beforeEach } from 'vitest'

describe('quiz_game.js tests', () => {
  let sutHTML
  let rootHTML
  beforeEach(() => {
    sutHTML = new QuizGame()
    rootHTML = sutHTML.shadowRoot.querySelector('#root')
  })

  describe('welcome to quiz-game screen tests', () => {
    let gamePanelHTML
    beforeEach(() => {
      gamePanelHTML = rootHTML.querySelector('.card-rotatable').querySelector('.game-panel')
    })

    it('should contain text "Welcome to the Quiz Game 💡"', () => {
      expect(gamePanelHTML.querySelector('#title').textContent).toBe('Welcome to the  Quiz Game 💡')
    })

    it('should not start the game if empty username', () => {
      const usernameInputHTML = gamePanelHTML.querySelector('#input')
      const submitBTN = gamePanelHTML.querySelector('#submit-btn')
      const questionsPanelHTML = rootHTML.querySelector('#questions-panel')
      expect(usernameInputHTML.placeholder).toBe('name')
      expect(usernameInputHTML.textContent).toBeFalsy()
      submitBTN.click()
      expect(questionsPanelHTML.style._values.display).toBe('none')
    })

    it('should start quiz game after entering username', () => {
      const usernameInputHTML = gamePanelHTML.querySelector('#input')
      const questionsPanelHTML = rootHTML.querySelector('#questions-panel')
      expect(usernameInputHTML.placeholder).toBe('name')
      expect(usernameInputHTML.textContent).toBeFalsy()
      usernameInputHTML.textContent = 'John'
      expect(questionsPanelHTML.style._values.display).toBe('none')
      // TODO
    })
  })
})
