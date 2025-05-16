import API_CONFIG from './apiConfig';

describe('API_CONFIG', () => {
    test('has TMDB_API_KEY defined', () => {
        expect(API_CONFIG.TMDB_API_KEY).toBeDefined();
        expect(API_CONFIG.TMDB_API_KEY.length).toBeGreaterThan(0);
    });

    test('has OMDB_API_KEY defined', () => {
        expect(API_CONFIG.OMDB_API_KEY).toBeDefined();
        expect(API_CONFIG.OMDB_API_KEY.length).toBeGreaterThan(0);
    });

    test('has correct TMDB base URL', () => {
        expect(API_CONFIG.TMDB_BASE_URL).toBe('https://api.themoviedb.org/3');
    });
});
