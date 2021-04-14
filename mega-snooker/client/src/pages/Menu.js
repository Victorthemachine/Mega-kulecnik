import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { Link } from 'react-router-dom'

import './../styles/Menu.css';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  render() {
    return (
      <>
        <Background className="back" />
        <div className='container'>
          <div className='head'>
            <h1> Mega kulečník </h1>
          </div>
          <div className='col'>
            <Link to='lobby'>
              <button >Hrát</button>
            </Link>
          </div>
          <div className='text'>
            <p>
              Co je to kulečník?
              </p>
            <br />
            <p>
              Kulečník je hra pro dva hráče, ve které je cílem strkat koule tágem do dir.
              Hráč smí udeřit tágem pouze do bílé koule a každý hráč má svouv vlastní barvu koulí, každou z nich musí postupně nastrkat do dir.
              Vyhrává ten, který nastrká všechny koule svojí barvy do díry a černou kouly jako poslední.
              </p>
          </div>
        </div>
      </>
    );
  }
}

export default Menu;
