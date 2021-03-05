import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './../components/Canvas';

/**
 * Just prepares the Canvas component for rendering. It is done this way
 * so that you can add other page elements if needed.
 */
class Game extends Component {
    render() {
        return (
            <Canvas images={this.props.children} />
        );
    }
}

/**
 * Look up PropTypes and see what declaration you need.
 * This basically adjusts the priority of the Redux variables.
 */
Game.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
};

export default Game;