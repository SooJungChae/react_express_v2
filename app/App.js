import React from 'react';
import Login from './Login';
import Grid from './Grid';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            Hello React-Router
            {/*<Link to="/users">Dashboard</Link>*/}
            <Route exact path="/" component={Login}/>
            <Route path="/grid" component={Grid}/>
            {/*<Route path="/" component={Login}/>*/}
        </div>
    </Router>
)

export default App;