import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/LatestMovies.css';
import '../Css/Watchlist.css';
import { getWatchlist, removeFromWatchlist } from '../utils/watchlist';

function Watchlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWatchlist());

    const onStorage = () => setItems(getWatchlist());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      <div className="behind-nav"></div>
      <section className="latest-movies">
        <div className="content">
          <div className="latest-movies-title">
            <h2>Watchlist</h2>
          </div>

          {items.length === 0 ? (
            <div className="watchlist-empty border">
              <p>Your watchlist is empty.</p>
              <Link className="red-btn" to="/find">Find movies</Link>
            </div>
          ) : (
            <div className="all-movies">
              {items.map((item) => (
                <div className="movie" key={item.id}>
                  <div className="movie-poster">
                    {item.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                        alt={item.title}
                      />
                    ) : (
                      <div className="poster-placeholder" />
                    )}
                  </div>

                  <div className="movie-text">
                    <Link to={`/movie/${item.id}`}>{item.title}</Link>

                    <button
                      className="watchlist-btn"
                      type="button"
                      onClick={() => setItems(removeFromWatchlist(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Watchlist;
