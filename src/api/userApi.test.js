import { fetchUser } from './userApi';

// Mock fetch globally
global.fetch = jest.fn();

describe('userApi', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetchUser successfully retrieves user data', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchUser(1);
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  test('fetchUser handles error responses', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchUser(1)).rejects.toThrow('User not found');
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });
}); 