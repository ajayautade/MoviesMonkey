# Movies Monkey

Movies Monkey is a React-based web application designed for movie enthusiasts. It allows users to discover upcoming films, search for specific titles, and manage a personal watchlist. The application features a modern, responsive interface with both light and dark themes.

## Live Preview
[MoviesMonkey](https://mymoviesmonkey.netlify.app)

## Key Features

### 1. Upcoming Movies (Home)
The default landing page showcases the latest upcoming movies. Users can browse these titles immediately upon opening the site.
![Upcoming Movies](./public/home_preview.png)

### 2. Find Movies & Genre Filter
Search for movies by name or explore by genre. The new **Genre Filter** allows users to select categories like Action, Comedy, Drama, etc., to discover movies tailored to their interests.
-   **Search**: Real-time search by title.
-   **Filter**: Dropdown menu to filter movies by official TMDB genres.

### 3. Watchlist Management
Keep track of movies you want to watch. Add movies to your watchlist from any page and manage them in a dedicated section.
![Watchlist](./public/watchlist_preview.png)

### 4. Dark Mode
Toggle between Light and Dark themes for a comfortable viewing experience in any lighting condition. The toggle is conveniently located in the navigation bar.

## Tech Stack

*   **Frontend**: React.js
*   **Styling**: CSS3 (Custom Grid, Flexbox, Variables)
*   **API**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
*   **Routing**: React Router

## Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm (v6 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ajayautade/MoviesMonkey.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd MoviesMonkey
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your TMDB API Key:
    ```env
    REACT_APP_MOVIE_DB=your_api_key_here
    ```
5.  Start the development server:
    ```bash
    npm start
    ```

## Created By

[Ajay Autade](https://www.linkedin.com/in/ajayautadepatil/)
