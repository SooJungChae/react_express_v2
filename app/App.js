import React from 'react';
import Login from './Login';
import Grid from './Grid';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/css/style.css';

const App = () => (
    <Router>
        <div>
            {/*<Link to="/users">Dashboard</Link>*/}
            <Route exact path="/" component={Login}/>
            <Route path="/grid" component={Grid}/>
            {/*<Route path="/" component={Login}/>*/}
        </div>
    </Router>
)

export default App;