import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './../components/Canvas';

class Game extends Component {
    render() {
        return (
            <Canvas images={this.props.children} />
        );
    }
}

Game.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
};

export default Game;