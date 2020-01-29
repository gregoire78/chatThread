import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './NewApp';
import Chat from './Chat';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store';

ReactDOM.render(
    <StoreProvider>
        <Router basename="/">
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/chat/:channel" component={Chat} />
            </Switch>
        </Router>
    </StoreProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
