import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        console.log(props);
        this.API = props.props.api;
        this.cancelGame = this.cancelGame.bind(this);
        console.log(this.API);
    }


    //TODO
    cancelGame() {
        this.props.history.push('/menu');
    }

    componentDidMount() {
        console.log(this.API.winnerWinnerChickenDinner === this.API.activeGame.myIndex ? 'YOU WIN! :)' : 'YOU LOSE! :(');
        this.setState({ message: this.API.winnerWinnerChickenDinner === this.API.activeGame.myIndex ? 'YOU WIN! :)' : 'YOU LOSE! :(' });
    }

    render() {
        return (
            <>
                <div className='container'>
                    <h1>{this.state.message}</h1>
                    <button onClick={this.cancelGame}>Zpět</button>
                </div>
            </>
        );
    }
}

export default withRouter(CreateRoom);