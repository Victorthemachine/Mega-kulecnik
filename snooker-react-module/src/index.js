import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Menu from './Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/**render((
    <Router>
        <Route path="/" component={App}>
            <Route path="api/animals" component={Animals}>
               <Route path="birds" component={Birds}/>
               <Route path="cats" component={Cats}/>
            </Route>
        </Route>
        <Route path="api/search:term" component={AnimalSearchBox}>
    </Router>
), document.body) */

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <div>HELLO WORLD!</div>
        </Route>
        <Route path="/home">
          <App />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);