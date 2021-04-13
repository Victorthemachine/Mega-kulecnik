import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from '../components/Canvas';

import './../styles/Stick.css';
/**
 * Just prepares the Canvas component for rendering. It is done this way
 * so that you can add other page elements if needed.
 */
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: '',
            api: '',
            degree: 0,
            cords: {
                top: 0,
                left: 0
            },
            visible: "hidden"
        };
        this.state.children = this.props.children;
        this.state.api = this.props.props.api;
    }

    componentDidMount() {
        //let img = document.getElementById('circle');
        window.addEventListener("mousemove", function (event) {
            if (!this.state.api.hasOwnProperty('cue')) return;
            if (this.state.api.cue === true) {
                this.setState({visible: "visible"});
                let x = (this.state.api.whiteBall.x) - (250 / 2);
                let y = (this.state.api.whiteBall.y) - (250 / 2);
                let degrees = Math.atan2(
                    event.pageX - this.state.api.whiteBall.x,
                    event.pageY - this.state.api.whiteBall.y
                ) * (-180 / Math.PI) + 90;;
                this.setState({
                    cords: {
                        top: x,
                        left: y
                    },
                    degree: degrees
                });
            } else {
              this.setState({visible: "hidden"});
            }
        }.bind(this));
    }

    render() {
            return (
            <>
                <Canvas images={this.props.children} api={this.state.api} />
                <div id="circle" class="circle" style={{
                    transform: `rotate(${this.state.degree}deg)`,
                    visibility: `${this.state.visible}`,
                    top: `${this.state.cords.left}px`,
                    left: `${this.state.cords.top}px`
                }}>
                    <div class="pointer"></div>
                </div>
            </>
        );
    }
}

/**
 * Look up PropTypes and see what declaration you need.
 * This basically adjusts the priority of the Redux letiables.
 */
Game.propTypes = {
    message: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
};

export default Game;