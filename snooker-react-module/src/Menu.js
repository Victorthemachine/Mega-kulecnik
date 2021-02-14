import React from 'react'
import './styles/Menu.css';
const MenuHandler = require('./functions/MenuHandler');
const menuHandler = new MenuHandler();

export default function Menu() {
    return (
        <div className='col'>
            <button onClick={menuHandler.handleLogin()}>Login/Register</button>
            <button>Play</button>
            <button>Statistics</button>
            <button>Settings</button>
        </div>
    )
}
