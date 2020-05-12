import React from 'react';
import { view } from '@risingstack/react-easy-state';
import state from './store.js';

const trackBar = (
  <div className="track-container">
    <div className="track-container__image"></div>
    <div className="track-container__title">
      <span className="track-container__title__name">Godzilla</span>
      <span className="track-container__title__author">Eminem</span>
    </div>
    <span className="track-container__duration">3:31</span>
    <div className="track-container__menu"></div>
  </div>
);

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="trackList-main">{trackBar}</div>;
  }
}

export default view(TrackList);
