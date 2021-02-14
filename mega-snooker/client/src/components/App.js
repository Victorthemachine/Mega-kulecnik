import logo from './../logo.svg';
import './../styles/App.css';
import { Component } from 'react';

/* This is a test class, I will be transfering the entire API mechanism into a separete Util class (to be able to reuse it).
 * Therefore, feel free to look at it and familirize yourself with "basic" React.js and Node.js relation.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.apiResponse}
        </p>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
