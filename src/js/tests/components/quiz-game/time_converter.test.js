import { convertMStoSStoString } from '../../../components/quiz-game/modules/timers/time_converter.js'

describe('time_converter.js tests', () => {
  describe('convertMStoSStoString tests', () => {
    test.each([
      [0, '0.000s'],
      [1, '0.001s'],
      [10, '0.010s'],
      [100, '0.100s'],
      [1000, '1.000s'],
      [1001, '1.001s'],
      [2500, '2.500s'],
      [2501, '2.501s'],
      [25010, '25.010s'],
      [60000, '60.000s']
    ])('should convert positive %dms to %s', (ms, expected) => {
      expect(convertMStoSStoString(ms)).toBe(expected)
    })

    test.each([
      [-1, '-0.001s'],
      [-10, '-0.010s'],
      [-100, '-0.100s'],
      [-1000, '-1.000s'],
      [-1001, '-1.001s'],
      [-2500, '-2.500s'],
      [-2501, '-2.501s'],
      [-25010, '-25.010s'],
      [-60000, '-60.000s']
    ])('should convert negative %dms to -%s', (ms, expected) => {
      expect(convertMStoSStoString(ms)).toBe(expected)
    })
  })
})
