import './../styles/App.css';
import React, { Component } from 'react';
import Test from './../assets/balls/koule1/Koule-1.1.svg';
import { Link } from 'react-router-dom';

const apiTool = require('./../utilities/apiTool');
const API = new apiTool();

/* This is a test class, I will be transfering the entire API mechanism into a separete Util class (to be able to reuse it).
 * Therefore, feel free to look at it and familirize yourself with "basic" React.js and Node.js relation.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", assets: "" };
  }

  componentDidMount() {
    API.pingTest().then(res => {
      this.setState({ apiResponse: res.data })
      console.log(this.state.apiResponse);
    });
    API.fetchAsset('balls', '1').then(res => {
      console.log('RESPONSE:')
      console.log(res);
      this.setState({ assets: res });
    })
  }

  render() {
    /*  return (
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
          <Image />
        </div>
      );*/
    return (
      <div>
        <header className="App-header">{this.state.apiResponse || 'API not working! Check if your server is running'}</header>
        <h1>^^^ Check api status to see if it works ^^^
          <br /><br />Check if image is loaded
        </h1>
        <Test />
        <div>
          <Link className="link" to="/menu">To menu!</Link>
        </div>
      </div >
    );
  }
}

export default App;
