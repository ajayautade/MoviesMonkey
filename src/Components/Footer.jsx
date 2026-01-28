import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Footer.css'
function Footer() {
    return (
        <>
        <section className="footer">
            <div className="content">
                <div className="footer-content">
                    <div className="company-info">
                        <Link to="/"><h2 className="heading">MoviesMonkey</h2> </Link>
                        <a href="mailto:ajayautade2@gmail.com">ajayautade2@gmail.com</a>
                        <a href='callto:9545034120'><p>+91 9545034120</p></a>
                    </div>
                    <div className="footer-links">
                        <div className="col-1">
                            <Link to="/">FAQ</Link>
                            <Link to="/">Investor Relations</Link>
                            <Link to="/">Privacy</Link>
                            <Link to="/">Speed Test</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/">Help Center</Link>
                            <Link to="/">Jobs</Link>
                            <Link to="/">Cookies</Link>
                            <Link to="/">Legal Notices</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/">Account</Link>
                            <Link to="/">Ways To Watch</Link>
                            <Link to="/">Corporate Info.</Link>
                            <Link to="/">Only On Movies Monkey</Link>
                        </div>
                        <div className="col-1">
                            <Link to="/">Media Centre</Link>
                            <Link to="/">Terms Of Use</Link>
                            <Link to="/">Privacy</Link>
                            <Link to="/">Contact us</Link>
                        </div>
                    </div>
                </div>
                <div className="credits">
                    <h4>Designed & Developed By 
                        <a href="https://github.com/ajayautade" className="heading" rel="noreferrer" target="_blank">Ajay Autade</a> 
                        | &copy; 2023 All Rights reserved.
                    </h4>
                </div>
            </div>      
        </section>  
        </>
    )
}

export default Footer
