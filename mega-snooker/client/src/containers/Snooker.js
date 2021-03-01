import { connect } from 'react-redux';

import Game from './../pages/Game';

const mapStateToProps = state => ({
  message: state.message,
  children: state.children,
});

const Snooker = connect(
  mapStateToProps,
)(Game);

export default Snooker;