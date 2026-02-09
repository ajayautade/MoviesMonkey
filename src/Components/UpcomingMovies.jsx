import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../Css/LandingPage.css'
import Spinner from './Spinner'
import WatchlistToggle from './WatchlistToggle'

class UpcomingMovies extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Movies: [],
            loading: false,
            page: 1,
            canLoadMore: true,
            baseUrl: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB}&language=en-US&page=`
        }

        this.loadMore = this.loadMore.bind(this);
    }
    fetchPage(page, mode){
        this.setState({ loading: true });

        axios
            .get(this.state.baseUrl + page)
            .then((res) => {
                const movies = res.data;
                const results = (movies.results || []).slice();
                results.sort((a, b) => b.popularity - a.popularity);

                this.setState((prev) => ({
                    Movies: mode === 'append' ? [...prev.Movies, ...results] : results,
                    loading: false,
                    page,
                    canLoadMore: page < (movies.total_pages || page),
                }));
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    canLoadMore: false,
                });
            });
    }

    componentDidMount(){
        this.fetchPage(1, 'replace');
    }

    loadMore(){
        if(this.state.loading || !this.state.canLoadMore){
            return;
        }
        this.fetchPage(this.state.page + 1, 'append');
    }
    render() {
        const{Movies, loading, canLoadMore} = this.state;
        return (
            <>
                <div className="behind-nav"></div>
                <section className="latest-movies">
                    <div className="content">
                        <div className="latest-movies-title">
                            <h2 className="heading">UpComing Movies</h2>
                        </div>
                        <div className="all-movies">
                            {loading && Movies.length === 0 && <Spinner />}
                            {
                                Movies.map(item =>{
                                    if(item.poster_path != null)
                                    {
                                        return (
                                            <div className="movie" key={item.id}>
                                                <div className="movie-poster">
                                                    <img src={"https://image.tmdb.org/t/p/w200/" +item.poster_path} alt={item.title} />
                                                </div>
                                                <div className="movie-text">
                                                <Link to={`/movie/${item.id}`}>{item.title}</Link>
                                                <WatchlistToggle movie={{ id: item.id, title: item.title, poster_path: item.poster_path }} />
                                                </div>
                                            </div>
                                        )
                                    }
                                    else{
                                        return null
                                    }
                                })
                            }
                        </div>

                        <div className="list-actions">
                            {loading && Movies.length > 0 && <div className="list-inline-loading">Loading…</div>}
                            {!loading && canLoadMore && (
                                <button className="load-more-btn" type="button" onClick={this.loadMore}>
                                    Load more
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default UpcomingMovies
