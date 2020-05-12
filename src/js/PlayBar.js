import React from 'react';
import { render } from 'react-dom';
import { view } from '@risingstack/react-easy-state';
import state from './store.js';

class PlayBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="playBar-container">
        <span className="song-title">Eminem: Godzilla</span>
        <div className="playBar-wrapper">
          <div className="playBar-wrapper__bar"></div>
        </div>
        <div className="play-time">
          <div className="play-time__start">0:00</div>
          <div className="play-time__end">3:31</div>
        </div>
      </div>
    );
  }
}

export default PlayBar;
