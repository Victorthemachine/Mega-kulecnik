import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './../components/Canvas';

/**
 * Just prepares the Canvas component for rendering. It is done this way
 * so that you can add other page elements if needed.
 */
class Game extends Component {
    
    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props);
        this.state = {
            children: '',
            api: ''
        }
        this.state.children = this.props.children;
        this.state.api = this.props.props.api;
    }

    render() {
        return (
            <Canvas images={this.state.children} api={this.state.api} />
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