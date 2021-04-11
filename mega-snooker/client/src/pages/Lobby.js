import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

class Lobby extends Component{

Render() {
        let history = useHistory();

        const back = () => {
            history.push('/menu');
        };
        const create = () => {
            history.push('/createroom');
        };
        const join = () => {
            history.push('/joinroom');
        };
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
    <>
        <Background className="back"/>
        <div className='container'>
            <div className='head'>
                <h1>Hrát</h1>
                </div>
                <div className='col'>
                    <button onClick={create}>Vytvořit místnost</button>
                    <button onClick={join}>Připojit se do místnosti</button>
                    <button onClick={back}>Zpět</button>
                </div>
            </div>
    </>
    );
    }   
}   

export default Lobby;
