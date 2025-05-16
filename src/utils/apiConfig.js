// Centralized API configuration
// Uses environment variables in production, falls back to hardcoded keys for development
const API_CONFIG = {
    TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY || '7c16ffd13e869cd11dcb5a4fe58da765',
    OMDB_API_KEY: process.env.REACT_APP_OMDB_API_KEY || 'c33fcfa4',
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
};

export default API_CONFIG;
