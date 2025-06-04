import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./NavBar.css"; // Import your custom CSS file
import image from"../logo.png"

import About from "./about";
import Excel from "./Excel";
import Recharche from "./recharche";

const NavBar = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <div className="navbar-brand">
          <div className="circle-image">
            <img
              src={image}
              alt=""
            
              width="60"
              height="32"
       
            />
          </div>
          <span className="brand-text">DEVI-APP</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav nav justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Insérer des fichiers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                Rechercher un fichier
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/recharche" className="nav-link">
                Tous les fichiers
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={Excel} />
        <Route path="/about" component={About} />
        <Route path="/recharche" component={Recharche} />
      </Switch>
    </Router>
  );
};

export default NavBar;
