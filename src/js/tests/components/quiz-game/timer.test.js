import Timer from '../../../components/quiz-game/modules/timers/timer.js'

describe('timer.js tests', () => {
  let sut
  const funcTick = vi.fn()
  const funcEndedTimer = vi.fn()
  beforeEach(() => {
    sut = new Timer()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  describe('startTimerIncrementing tests', () => {
    it('should increment timer to 10s', () => {
      sut.startTimerIncrementing(funcTick)
      expect(sut.seconds).toBe(0)
      vi.advanceTimersByTime(10000)
      expect(sut.seconds).toBe(10)
      expect(funcTick).toHaveBeenCalledTimes(10)
    })

    it('should increment timer and stop at 5s', () => {
      const spyStopTimer = vi.spyOn(sut, 'stopTimer')
      sut.startTimerIncrementing(funcTick)
      expect(sut.seconds).toBe(0)
      setTimeout(() => sut.stopTimer(), 6000)
      vi.advanceTimersByTime(6000)
      expect(sut.seconds).toBe(5)
      expect(funcTick).toHaveBeenCalledTimes(5)
      expect(spyStopTimer).toHaveBeenCalledOnce()
    })
  })

  describe('startTimerDecreasing test', () => {
    it('should decrement timer from 10s to 0s', () => {
      sut.startTimerDecreasing(10, funcTick, funcEndedTimer)
      expect(sut.seconds).toBe(10)
      vi.advanceTimersByTime(10000)
      expect(sut.seconds).toBe(0)
      expect(funcTick).toHaveBeenCalledTimes(10)
      expect(funcEndedTimer).toHaveBeenCalledOnce()
    })

    it('should decrement timer until 5s and stop', () => {
      const spyStopTimer = vi.spyOn(sut, 'stopTimer')
      sut.startTimerDecreasing(10, funcTick, funcEndedTimer)
      expect(sut.seconds).toBe(10)
      setTimeout(() => sut.stopTimer(), 6000)
      vi.advanceTimersByTime(6000)
      expect(sut.seconds).toBe(5)
      expect(funcTick).toHaveBeenCalledTimes(5)
      expect(spyStopTimer).toHaveBeenCalledOnce()
    })
  })
})
