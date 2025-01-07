import counterReducer, { increment, decrement } from './counterSlice';

describe('counter reducer', () => {
  test('should return the initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({ value: 0 });
  });

  test('should handle increment', () => {
    expect(counterReducer({ value: 0 }, increment())).toEqual({ value: 1 });
  });

  test('should handle decrement', () => {
    expect(counterReducer({ value: 1 }, decrement())).toEqual({ value: 0 });
  });
}); 