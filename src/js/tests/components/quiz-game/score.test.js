import { Score } from '../../../components/quiz-game/modules/high_score'

describe('score.js tests', () => {
  const username = 'John'
  const score = 15166
  let sut

  beforeEach(() => {
    sut = new Score(username, score)
  })

  describe('Constructor, Getters, Setters tests', () => {
    it('should return same name and score as passed in constructor using getter', () => {
      expect(sut.username).toBe(username)
      expect(sut.sessionScore).toBe(score)
    })
  })

  describe('JSON and Object representation tests', () => {
    it('should return JSON string representation of score class', () => {
      const expected = JSON.stringify({ username, score })
      expect(sut.toJSON()).toBe(expected)
    })

    it('should return JSON object representation of score class', () => {
      const expected = { username, score }
      expect(sut.toObject()).toEqual(expected)
    })
  })
})
