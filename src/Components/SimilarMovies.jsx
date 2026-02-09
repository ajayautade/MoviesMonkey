import axios from "axios";
import React, { Component } from "react";
import "../Css/App.css";
import { Link } from 'react-router-dom'
import Spinner from "./Spinner";
import WatchlistToggle from './WatchlistToggle';

class SimilarMovies extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             similarMovies: [],
             loading: false,
        }
    }

    fetchSimilar(movieId){
        if(!movieId){
            this.setState({ similarMovies: [], loading: false });
            return;
        }

        const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIE_DB}&language=en-US&page=1`;

        this.setState({ loading: true });
        axios.get(baseUrl)
        .then(res =>{
            const result = res.data;

            this.setState({
                similarMovies: (result.results || []).slice(0,4),
                loading: false
            })
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                similarMovies: [],
                loading: false,
            });
        });
    }

    componentDidMount(){
        this.fetchSimilar(this.props.movieId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.movieId !== this.props.movieId){
            this.fetchSimilar(this.props.movieId);
        }
    }
  render() {
      const{similarMovies, loading } = this.state;
    return (
      <>
      <section className="similar-movies" style={{marginTop: "55px"}}>
        <div className="content">
            <div className="latest-movies-title">
            <h2 style={{fontSize: "25px"}}>You May Also Like</h2>
            </div>
            <div className="all-movies">
            { loading && <Spinner /> }
            {
            !loading && similarMovies.map((item) => {
                if (item.poster_path != null) {
                return (
                    <div className="movie" key={item.id}>
                    <div className="movie-poster">
                        <img
                        src={
                            "https://image.tmdb.org/t/p/w200/" + item.poster_path
                        }
                        alt={item.title}
                        />
                    </div>
                    <div className="movie-text">
                        <Link to={`/movie/${item.id}`}>{item.title}</Link>
                        <WatchlistToggle movie={{ id: item.id, title: item.title, poster_path: item.poster_path }} />
                    </div>
                    </div>
                );
                } else {
                return null;
                }
            })}
            </div>
        </div>
      </section>
      </>
    );
  }
}

export default SimilarMovies;
