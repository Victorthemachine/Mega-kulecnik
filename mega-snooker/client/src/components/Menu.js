import React from 'react'
import './../styles/Menu.css';

export default function Menu() {
    return (
        <div className='col'>
            <button onClick={console.log('Login button was clicked!')}>Login/Register</button>
            <button>Play</button>
            <button>Statistics</button>
            <button>Settings</button>
        </div>
    )
}
