import React from 'react';
import Background from './../assets/other/Background.svg';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

export default function Menu() {
    let history = useHistory();
    const superid = "bigPP123";
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
            <p className="gameid"><b>passphrase vaší místnosti: {superid}</b></p>
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
