import React from 'react';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

export default function Menu() {
    let history = useHistory();

    const redirect = () => {
        history.push('/lobby');
    };

    return (
        <div className='col'>
            <button onClick={console.log('Login button was clicked!')}>Login/Register</button>
            <button onClick={redirect}>Play</button>
            <button>Statistics</button>
            <button>Settings</button>
        </div>
    );
}
