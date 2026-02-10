import React, { Component } from 'react';
import FindMovies from './Components/FindMovies';
import Navbar from './Components/Navbar';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import UpcomingMovies from './Components/UpcomingMovies';
import LatestMovies from './Components/LatestMovies';
import MovieDetail from './Components/MovieDetail';
import FAQ from './Components/FAQ';
import Watchlist from './Components/Watchlist';
import TopRatedMovies from './Components/TopRatedMovies';
import NotFound from './Components/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={UpcomingMovies} />
            <Route path="/find" exact component={FindMovies} />
            <Route path="/latestmovies" exact component={LatestMovies} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/upcomingmovies" exact component={UpcomingMovies} />
            <Route path="/toprated" exact component={TopRatedMovies} />
            <Route path="/watchlist" exact component={Watchlist} />
            <Route path="/movie/:id" component={MovieDetail} />

            {/* Footer pages */}
            <Route path="/faq" exact component={FAQ} />

            {/* 404 (keep last) */}
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App
