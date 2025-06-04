import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from "./App"
import About from "./pages/about"
import Recharche from "./pages/recharche"



ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/recharche" component={Recharche} />
            </main>
        </div>
    </Router>,
    document.getElementById("root")
    
)
