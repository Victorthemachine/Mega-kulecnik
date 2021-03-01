import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ErrorBoundary from './containers/ErrorBoundary';
import Menu from './pages/Menu';
import App from './pages/App';
import Lobby from './pages/Lobby';
import Snooker from './containers/Snooker';

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Route>
        <Route path="/menu">
          <ErrorBoundary>
            <Menu />
          </ErrorBoundary>
        </Route>
        <Route path="/lobby">
          <ErrorBoundary>
            <Lobby />
          </ErrorBoundary>
        </Route>
        <Route path="/game">
          <Provider store={store}>
            <ErrorBoundary>
              <Snooker />
            </ErrorBoundary>
          </Provider>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
