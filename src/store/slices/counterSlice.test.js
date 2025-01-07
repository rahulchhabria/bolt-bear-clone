import counterReducer, { increment, decrement } from './counterSlice';

describe('counter reducer', () => {
  test('should return the initial state', () => {
    expect(counterReducer(undefined, { type: undefined })).toEqual({
      value: 0,
    });
  });

  test('should handle increment', () => {
    const previousState = { value: 0 };
    expect(counterReducer(previousState, increment())).toEqual({
      value: 1,
    });
  });

  test('should handle decrement', () => {
    const previousState = { value: 1 };
    expect(counterReducer(previousState, decrement())).toEqual({
      value: 0,
    });
  });
}); 