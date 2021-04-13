import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { withRouter } from 'react-router-dom'

import './../styles/Menu.css';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      passphrase: ''
    };
    this.connectToGame = this.connectToGame.bind(this);
    this.validatePasshrase = this.validatePasshrase.bind(this);
    this.cancelGame = this.cancelGame.bind(this);
    this.API = props.props.api;
  }

  connectToGame() {
    this.API.joinGame(this.state.passphrase).then(res => {
      console.log(res);
      if (res !== 'Error, invalid game') {
        this.props.history.push('/game');
      }
    });
  }

  validatePasshrase({ target }) {
    console.log(target);
    this.setState({ passphrase: target.value });
  }
  cancelGame() {
    this.props.history.push('/lobby');
  }

  render() {
    return (
      <>
        <Background className="back" />
        <div className='container'>
          <div className='head'>
            <h1>Připojit se</h1>
          </div>
          <div className='col'>
            <input id="id" type="text" placeholder="XXXXX" maxLength="5" className="superid" value={this.state.passphrase} onChange={this.validatePasshrase}></input>
            <button onClick={this.connectToGame}>Připojit</button>
            <button onClick={this.cancelGame}>Zpět</button>
          </div>
          <div className='text'>
            <p1>
              Jak se napojit?
                </p1>
            <br />
            <p2>
              Zadejte passphrase, které vám poslal kamarád do volného pole a zmáčkněte připojit.
                </p2>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Menu);