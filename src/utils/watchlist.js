const STORAGE_KEY = 'moviesmonkey.watchlist.v1';

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function getWatchlist() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export function isInWatchlist(id) {
  const list = getWatchlist();
  return list.some((m) => String(m.id) === String(id));
}

export function toggleWatchlist(movie) {
  const list = getWatchlist();
  const exists = list.some((m) => String(m.id) === String(movie.id));
  const next = exists ? list.filter((m) => String(m.id) !== String(movie.id)) : [movie, ...list];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return { next, exists };
}

export function removeFromWatchlist(id) {
  const list = getWatchlist();
  const next = list.filter((m) => String(m.id) !== String(id));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
