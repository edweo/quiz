import { HighScoreManager } from '../../../components/quiz-game/modules/high_score'

const HIGH_SCORES_FULL = {
  1: {
    username: 'Dave',
    score: 10000
  },
  2: {
    username: 'John',
    score: 11000
  },
  3: {
    username: 'Ema',
    score: 12000
  },
  4: {
    username: 'Peter',
    score: 13000
  },
  5: {
    username: 'William',
    score: 14000
  }
}

const HIGH_SCORES_EMPTY = {}

describe('high_score_manger.js tests', () => {
  let sut
  let spyLocalStorageJSON
  let spyUpdateLocalStorage

  describe('is new high-score tests with fully populated high-score table', () => {
    beforeEach(() => {
      sut = new HighScoreManager()
      spyLocalStorageJSON = vi.spyOn(sut, 'getHighScoresLocalStorageJSON').mockImplementation(() => HIGH_SCORES_FULL)
      spyUpdateLocalStorage = vi.spyOn(sut, '_updateHighScoreLocalStorage').mockImplementation((newHighScoreArray) => {
        spyLocalStorageJSON = vi.spyOn(sut, 'getHighScoresLocalStorageJSON').mockImplementation(() => JSON.stringify(newHighScoreArray))
      })
    })

    test.each([
      ['Mike', 13333, 5],
      ['Mike', 12333, 4],
      ['Mike', 11333, 3],
      ['Mike', 10333, 2],
      ['Mike', 9999, 1],
      ['Mike', 13999, 5]
    ])('should be new high-score: %s %d %d', (username, score, newPlaceInTable) => {
      expect(sut.isNewHighScore(username, score)).toBeTruthy()
      const scorePlace = JSON.parse(sut.getHighScoresLocalStorageJSON())[newPlaceInTable - 1]
      expect(scorePlace.username).toBe(username)
      expect(scorePlace.score).toBe(score)
    })

    test.each([
      ['Mike', 14000],
      ['Mike', 14001],
      ['Mike', 15000],
      ['Mike', 16600],
      ['Mike', 20000],
      ['Mike', 14444]
    ])('should not be new high-score: %s %d', (username, score) => {
      expect(sut.isNewHighScore(username, score)).toBeFalsy()
      const scores = Object.values(sut.getHighScoresLocalStorageJSON())
      expect(scores).not.toContain({ username, score })
    })
  })

  describe('is new high-score tests with empty high-score table', () => {
    beforeEach(() => {
      sut = new HighScoreManager()
      spyLocalStorageJSON = vi.spyOn(sut, 'getHighScoresLocalStorageJSON').mockImplementation(() => HIGH_SCORES_EMPTY)
      spyUpdateLocalStorage = vi.spyOn(sut, '_updateHighScoreLocalStorage').mockImplementation((newHighScoreArray) => {
        spyLocalStorageJSON = vi.spyOn(sut, 'getHighScoresLocalStorageJSON').mockImplementation(() => JSON.stringify(newHighScoreArray))
      })
    })

    test.each([
      ['Mike', 14000],
      ['Mike', 14001],
      ['Mike', 15000],
      ['Mike', 16600],
      ['Mike', 20000],
      ['Mike', 14444],
      ['Mike', 13333],
      ['Mike', 12333],
      ['Mike', 11333],
      ['Mike', 10333],
      ['Mike', 9999],
      ['Mike', 13999]
    ])('should be new high-score: %s %d', (username, score) => {
      expect(sut.getHighScoresLocalStorageJSON().keys).toBeFalsy()
      expect(spyLocalStorageJSON).toHaveBeenCalledOnce()
      expect(sut.isNewHighScore(username, score)).toBeTruthy()
      expect(spyUpdateLocalStorage).toHaveBeenCalledOnce()

      const highScore = JSON.parse(sut.getHighScoresLocalStorageJSON())
      expect(highScore[0].username).toBe(username)
      expect(highScore[0].score).toBe(score)
    })
  })
})
