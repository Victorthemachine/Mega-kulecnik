import { connect } from 'react-redux';

import Game from './../pages/Game';

/**
 * This is where you want to declare your Redux variables.
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = state => ({
  message: state.message,
  children: state.children,
});

const Snooker = connect(
  mapStateToProps,
)(Game);

export default Snooker;