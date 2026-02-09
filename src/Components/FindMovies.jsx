import React, { Component } from 'react'
import '../Css/FindMovies.css'
import '../Css/App.css'
import axios from 'axios'
import SimilarMovies from './SimilarMovies'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import WatchlistToggle from './WatchlistToggle'
// import NoImage from '../Images/NoImage.jpg'

class FindMovies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchQuery: " ",
            searchResult: [],
            inputValue: "",
            loading: false,
            page: 1,
            canLoadMore: false,
            genres: [],
            selectedGenre: "",
            baseUrl: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB}&query=`,
            discoverUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB}&include_adult=false&sort_by=popularity.desc&with_genres=`
        }

        this.loadMore = this.loadMore.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.genreChangeHandler = this.genreChangeHandler.bind(this);
    }

    componentDidMount() {
        // Fetch genre list
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB}&language=en-US`)
            .then(res => {
                this.setState({ genres: res.data.genres || [] });
            })
            .catch(err => console.log(err));
    }

    fetchPage(page, mode) {
        const query = encodeURIComponent((this.state.searchQuery || "").trim());
        if (!query) {
            this.setState({ searchResult: [], loading: false, canLoadMore: false });
            return;
        }

        this.setState({ loading: true });

        let url = "";
        if (this.state.selectedGenre) {
            url = `${this.state.discoverUrl}${this.state.selectedGenre}&page=${page}`;
        } else {
            url = this.state.baseUrl + query + `&page=${page}`;
        }

        axios
            .get(url)
            .then((res) => {
                const result = res.data;
                const results = result.results || [];

                this.setState((prev) => ({
                    searchResult: mode === 'append' ? [...prev.searchResult, ...results] : results,
                    loading: false,
                    page,
                    canLoadMore: page < (result.total_pages || page),
                }));
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    searchResult: [],
                    canLoadMore: false,
                });
            });
    }

    submitHandler(e) {
        e.preventDefault();
        this.setState({
            searchQuery: this.state.inputValue,
            selectedGenre: "", // Clear genre when searching
            page: 1,
            canLoadMore: false,
        }, () => {
            this.fetchPage(1, 'replace');
        })
    }

    loadMore() {
        if (this.state.loading || !this.state.canLoadMore) {
            return;
        }
        this.fetchPage(this.state.page + 1, 'append');
    }
    changeHandler(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    genreChangeHandler(e) {
        const genreId = e.target.value;
        this.setState({
            selectedGenre: genreId,
            searchQuery: "", // Clear search when genre selected
            inputValue: "",
            page: 1,
            canLoadMore: false
        }, () => {
            if (genreId) {
                this.fetchPage(1, 'replace');
            } else {
                this.setState({ searchResult: [] }); // Clear results if no genre and no search
            }
        });
    }
    render() {
        const { inputValue, searchResult, loading, canLoadMore } = this.state;
        return (
            <>
                <div className="behind-nav"></div>
                <section className="find-movies">
                    <div className="content">
                        <div className="search">
                            <div className="search-container">
                                <form onSubmit={this.submitHandler} >
                                    <input className="search-container-input" type="text" placeholder="Search.." value={inputValue} onChange={this.changeHandler} required name="search" />
                                    <button className="s-btn" type="submit"><i className="fa fa-search heading"></i></button>
                                </form>
                                <div className="genre-filter">
                                    <select value={this.state.selectedGenre} onChange={this.genreChangeHandler} className="genre-select">
                                        <option value="">Filter by Genre</option>
                                        {this.state.genres.map(genre => (
                                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="latest-movies-title">
                            <h2>Search Results</h2>
                        </div>
                        <div className="all-movies">
                            {!loading && searchResult.length === 0 ? "No Results Found" : ""}
                            {loading && searchResult.length === 0 && <Spinner />}
                            {
                                searchResult.map(item => {
                                    if (item.poster_path != null) {
                                        return (
                                            <div className="movie" key={item.id}>
                                                <div className="movie-poster">
                                                    <img src={"https://image.tmdb.org/t/p/w200/" + item.poster_path} alt={item.title} />
                                                </div>
                                                <div className="movie-text">
                                                    <Link to={`/movie/${item.id}`}>{item.title}</Link>
                                                    <WatchlistToggle movie={{ id: item.id, title: item.title, poster_path: item.poster_path }} />
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </div>

                        <div className="list-actions">
                            {loading && searchResult.length > 0 && <div className="list-inline-loading">Loading…</div>}
                            {!loading && canLoadMore && (
                                <button className="load-more-btn" type="button" onClick={this.loadMore}>
                                    Load more
                                </button>
                            )}
                        </div>
                    </div>
                    <SimilarMovies movieId={385687} />
                </section>
            </>
        )
    }
}

export default FindMovies
