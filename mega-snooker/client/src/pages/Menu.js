import React, { Component } from 'react';
import Background from './../assets/other/Background.svg';
import { useHistory } from 'react-router-dom';

import './../styles/Menu.css';

class Menu extends Component{

Render() {
    let history = useHistory();

    const redirect = () => {
        history.push('/lobby');
    };

    return (
      <>
      <Background className="back"/>
      <div className='container'>
        <div className='head'>
        <h1> Mega kulečník </h1>
      </div>      
        <div className='col'>
            <button onClick={redirect}>Hrát</button>
            <button >Nastavení</button>
        </div>
        <div className='text'>
          <p1> Co je to kulečník?
          <br /></p1>
          <p2>Kulečník je hra pro dva hráče, ve které je cílem strkat koule tágem do dir.
              Hráč smí udeřit tágem pouze do bílé koule a každý hráč má svouv vlastní barvu koulí, každou z nich musí postupně nastrkat do dir.
              Vyhrává ten, který nastrká všechny koule svojí barvy do díry a černou kouly jako poslední.</p2>
        </div>        
      </div>
      </>
    );
  }
}

export default Menu;
