import { fetchMovieDetails } from './../app';

describe('fetchMovieDetails function', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mockear la función global fetch
  });

  afterEach(() => {
    jest.resetAllMocks(); // Resetear todos los mocks después de cada prueba
  });

  it('fetches movie details successfully', async () => {
    const mockResponse = { id: 1, title: 'Mock Movie' };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const data = await fetchMovieDetails(1);

    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/1',
      expect.objectContaining({
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: expect.any(String),
        },
      })
    );
  });

  it('handles fetch error gracefully', async () => {
    const errorMessage = 'API error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const data = await fetchMovieDetails(1);

    expect(data).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching movie details:',
      expect.any(Error)
    );
  });
});
