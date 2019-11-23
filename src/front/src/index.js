import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BodyBackgroundColor from 'react-body-backgroundcolor'



import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => (
    <BodyBackgroundColor backgroundColor='#5c5c5c'>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route path='/app/:pseudo/:lang' component={App}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </BodyBackgroundColor>
        
)
    

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
