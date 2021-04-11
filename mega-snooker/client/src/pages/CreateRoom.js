import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { superid: "B1GPP" };
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
        <h1>Vaše místnost</h1>
      </div>      
        <div className='col'>
            <p className="gameid"><b>ID vaší místnosti: {this.state.superid}</b></p>
            <button onClick={back}>Zpět</button>         
        </div>
        <div className='text'>
          <p1> Kdy začne hra?
          <br /></p1>
          <p2> Hra začne jakmile tvůj kamarád zadá kód, který jsi mu nasdílel. Neopouštěj tutu stránku, pokud nechceš, aby se tato mistnost zrušila.</p2>
        </div>        
      </div>
      </>
    );
  }
}

export default CreateRoom;
