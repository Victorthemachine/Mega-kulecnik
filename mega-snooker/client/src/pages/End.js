import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { Link } from 'react-router-dom';


import './../styles/Menu.css';

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            win: 1
        };
        this.API = props.props.api;
    }

    render() {
        if(this.state.win === 1) {
        return (
            <>
                <Background className="back" />
                <div className='container'>
                    <div className='head'>
                        <h1>!!Gratuluji!!</h1>
                    </div>                                    
                    <div className='col'> 
                    <p3><b>Vyhrál jsi!!!</b></p3>                                     
                        <Link to='/menu'>
                            <button >Zpět do menu</button>
                        </Link>
                    </div>
                </div>
            </>
        );
        } else {
            return (
                <>
                    <Background className="back" />
                    <div className='container'>
                        <div className='head'>
                            <h1>Nevadí :(</h1>
                        </div>
                        <div className='col'>    
                        <p3><b>Třeba někdy příště</b></p3>                                
                            <Link to='/menu'>
                                <button >Zpět do menu</button>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    }
}

export default Lobby;