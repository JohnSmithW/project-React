import React from 'react';
import { view } from '@risingstack/react-easy-state';
import state from './store.js';
import PlayBar from './PlayBar';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-main">
        <PlayBar />
        <div className="player-container">
          <div className="player-container__item player-container__item_rewind"></div>
          <div className="player-container__item player-container__item_back"></div>
          <div className="player-container__item player-container__item_play"></div>
          <div className="player-container__item player-container__item_next"></div>
          <div className="player-container__item player-container__item_fast-forward"></div>
        </div>
      </div>
    );
  }
}

export default view(Player);
