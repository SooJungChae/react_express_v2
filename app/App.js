import React from 'react';
import Login from './Login';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            Hello React-Router
            <Link to="/users">Dashboard</Link>
            <Route path="/" component={Login}/>
        </div>
    </Router>
)

export default App;