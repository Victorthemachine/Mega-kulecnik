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
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Snooker from './containers/Snooker';

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/**
 * If you cannot see your pages, you need to have them written down here.
 * As you can see we use the react router for this. Add your route and pages
 * into the router node so that it is displayed when the route is triggered.
 * Don't forget the ErrorBoundary, it will protect the project from crashing.
 */
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
        <Route path="/createroom">
          <ErrorBoundary>
            <CreateRoom />
          </ErrorBoundary>
        </Route>
        <Route path="/joinroom">
          <ErrorBoundary>
            <JoinRoom />
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
