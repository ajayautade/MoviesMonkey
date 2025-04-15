import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Css/Footer.css'
function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className="footer">
                <div className="content">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <span className="footer-title">Movies Monkey</span>
                            </Link>
                            <p className="footer-subtitle">
                                Discover movies and TV shows.
                            </p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-col">
                                <p className="footer-col-title">Explore</p>
                                <NavLink activeClassName="active" to="/find">Find Movies</NavLink>
                                <NavLink activeClassName="active" to="/latestmovies">Latest Movies</NavLink>
                                <NavLink activeClassName="active" to="/upcomingmovies">Upcoming Movies</NavLink>
                            </div>

                            <div className="footer-col">
                                <p className="footer-col-title">Support</p>
                                <NavLink activeClassName="active" to="/faq">FAQ</NavLink>
                                <NavLink activeClassName="active" to="/contact">Contact</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copy">© {year} Movies Monkey</p>
                        <p className="footer-credit">
                            Built by{' '}
                            <a href="https://github.com/ajayautade" rel="noreferrer" target="_blank">Ajay Autade</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
