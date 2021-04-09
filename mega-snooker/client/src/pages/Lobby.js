import React from 'react';
//import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

export default function Menu() {
    /*    let history = useHistory();

        const redirect = () => {
            history.push('/lobby');
        };*/
    /**
     *
             * FIX: adjust this label node to be a slider ON/OFF

             <label >
             Multiplayer:
             <input type="checkbox"/>
             <span class="slider round"></span>
         </label>
     */

    return (
      <div className='container'>
      <div className='box'>
      </div>
      <div className='head'>
        <h1> Play </h1>
        </div>
        <div className='col'>
            <button onClick={console.log('Singleplayer button was clicked!')}>Singleplayer</button>
            <button>Against AI</button>
            <button>Multiplayer</button>
            <button>Settings</button>
        </div>
        </div>
    );
}
