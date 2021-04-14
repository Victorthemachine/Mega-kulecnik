import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { Link } from 'react-router-dom'

import './../styles/Menu.css';

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Background className="back" />
                <div className='container'>
                    <div className='head'>
                        <h1>Hrát</h1>
                    </div>
                    <div className='col'>
                        <Link to='/createroom'>
                            <button >Vytvořit místnost</button>
                        </Link>
                        <Link to='/joinroom'>
                            <button >Připojit se do místnosti</button>
                        </Link>
                        <Link to='/menu'>
                            <button >Zpět</button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }
}

export default Lobby;
