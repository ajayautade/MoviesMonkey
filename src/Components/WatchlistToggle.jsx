import React, { useEffect, useState } from 'react';
import '../Css/WatchlistToggle.css';
import { isInWatchlist, toggleWatchlist } from '../utils/watchlist';

function WatchlistToggle({ movie }) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    if (movie && movie.id) {
      setInList(isInWatchlist(movie.id));
    }
  }, [movie]);

  if (!movie || !movie.id) {
    return null;
  }

  return (
    <button
      className={inList ? 'wl-toggle active' : 'wl-toggle'}
      type="button"
      onClick={() => {
        const { exists } = toggleWatchlist(movie);
        setInList(!exists);
      }}
      aria-label={inList ? 'Remove from watchlist' : 'Add to watchlist'}
      title={inList ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {inList ? 'Saved' : 'Save'}
    </button>
  );
}

export default WatchlistToggle;
