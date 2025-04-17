import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/App.css';
import '../Css/NotFound.css';

function NotFound() {
  return (
    <>
      <div className="behind-nav"></div>
      <section className="not-found">
        <div className="content">
          <div className="container border">
            <h2 className="heading">404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for doesn’t exist.</p>
            <div className="not-found-actions">
              <Link className="red-btn" to="/">Go Home</Link>
              <Link className="btn-outline" to="/find">Find Movies</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
