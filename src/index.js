import React from 'react';
import { createRoot } from 'react-dom/client';
import 'mobx-react/batchingForReactDom'
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Chat from './Chat';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StoreProvider>
        <HashRouter>
            <Routes>
                <Route path='chat' element={<Chat />}>
                    <Route path=":channel" element={<Chat />} />
                </Route>
                <Route path='/' element={<App />}>
                    <Route path=":channels" element={<App />} />
                </Route>
            </Routes>
        </HashRouter>
    </StoreProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
