import { fetchUser } from './userApi';

// Mock fetch globally
global.fetch = jest.fn();

describe('userApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches user successfully', async () => {
    const mockUser = { id: '1', name: 'John Doe' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await fetchUser('1');
    expect(user).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('throws error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchUser('1')).rejects.toThrow('Failed to fetch user');
  });
}); 