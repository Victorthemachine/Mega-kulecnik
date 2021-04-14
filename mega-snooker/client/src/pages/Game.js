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
            visible: "visible"
        };
        this.state.children = this.props.children;
        this.state.api = this.props.props.api;
    }

    componentDidMount() {
        let img = document.getElementById('circle');
        console.log('TEST IS THIS MOUNTING?');
        window.addEventListener("mousemove", function (event) {
            if (this.state.api.whiteBall.cue === true) {
                this.setState({ visible: "visible" });
                let canvascords = window.innerWidth / 2;

                console.log(this.state.api.whiteBall.x + " " + this.state.api.whiteBall.y);
                console.log(this.state.api.whiteBall.radius);
                let x = (this.state.api.whiteBall.x + canvascords + this.state.api.whiteBall.radius / 2) - (img.clientWidth / 2);
                let y = (this.state.api.whiteBall.y + window.innerHeight - this.state.api.whiteBall.radius / 2) - (img.clientHeight / 2);
                let degrees = Math.atan2(
                    event.pageX - (this.state.api.whiteBall.x + this.state.api.whiteBall.radius / 2 + canvascords),
                    event.pageY - (this.state.api.whiteBall.y - this.state.api.whiteBall.radius / 2 + window.innerHeight)
                ) * (-180 / Math.PI) + 90;;
                this.setState({
                    cords: {
                        top: x,
                        left: y
                    },
                    degree: degrees
                });
            } else {
                console.log(this.state.api.cue);
                this.setState({ visible: "hidden" });
            }
        }.bind(this));
    }

    render() {
        return (
            <>
                <Canvas images={this.props.children}
                    api={this.state.api} />
                <div id="circle"
                    class="circle"
                    style={
                        {
                            transform: `rotate(${this.state.degree}deg)`,
                            visibility: `${this.state.visible}`,
                            top: `${this.state.cords.left}px`,
                            left: `${this.state.cords.top}px`
                        }
                    } >
                    <div class="pointer" />
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