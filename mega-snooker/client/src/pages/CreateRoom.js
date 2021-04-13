import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { withRouter } from 'react-router-dom'

import './../styles/Menu.css';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passphrase: '',
      redirect: false
    };
    console.log(props);
    this.API = props.props.api;
    this.cancelGame = this.cancelGame.bind(this);
  }

  componentDidMount() {
    this.API.createGame().then(res => {
      const { pass } = res;
      this.setState({ passphrase: pass });
      console.log(this.API.activeGame);
      this.API.connectSocket().then(socket => {
        console.log('connected!');
        socket.onmessage = function (event) {
          if (event.data === 'Start') {
            console.log(event.data);
            this.API.disconnectSocket(socket);
            this.props.history.push('/game');
          }
        }.bind(this);
      })
    })
  }

  //TODO
  cancelGame() {
    this.props.history.push('/lobby');
  }

  render() {
    return (
      <>
        <Background className="back" />
        <div className='container'>
          <div className='head'>
            <h1>Vaše místnost</h1>
          </div>
          <div className='col'>
            <p className="gameid"><b>ID vaší místnosti: {this.state.passphrase}</b></p>
            <button onClick={this.cancelGame}>Zpět</button>
          </div>
          <div className='text'>
            <p1> Kdy začne hra?
            <br /></p1>
            <p2> Hra začne jakmile tvůj kamarád zadá kód, který jsi mu nasdílel. Neopouštěj tuto stránku, pokud nechceš, aby se tato mistnost zrušila.</p2>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CreateRoom);
