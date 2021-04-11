import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  Render() {
    let history = useHistory();
    const back = () => {
        history.push('/lobby');
    };
    return (
      <>
      <Background className="back"/>
      <div className='container'>
        <div className='head'>
        <h1>Připojit se</h1>
      </div>      
        <div className='col'>           
            <input id="id" type="text" placeholder="XXXXX" maxlength="5" className="superid"></input>
            <button >Připojit</button> 
            <button onClick={back}>Zpět</button>         
        </div>
        <div className='text'>
          <p1> Jak se napojit?
          <br /></p1>
          <p2>Zadejte passphrase, které vám poslal kamarád do volného pole a zmáčkněte připojit.</p2>
        </div>        
      </div>
      </>
    );
  }
}
export default JoinRoom;
