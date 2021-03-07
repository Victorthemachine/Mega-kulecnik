import React from 'react';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

export default function Menu() {
    let history = useHistory();

    const redirect = () => {
        history.push('/lobby');
    };

    return (
      <div className='container'>
      <div className='box'>
      </div>
      <div className='head'>
        <h1> Mega kulečník </h1>
      </div>
        <div className='col'>
            <button onClick={console.log('Login button was clicked!')}>Login/Register</button>
            <button onClick={redirect}>Play</button>
            <button>Statistics</button>
            <button>Settings</button>
        </div>
        <div className='pravidla'>
          <p1> Co je to kulečník?
          <br /></p1>
          <p2> Balh bluh blah blah bluuu UwU asd blu m abla </p2>
        </div>
      </div>
    );
}
