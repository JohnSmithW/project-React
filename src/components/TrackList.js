import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import state from '../store';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.createAudio = this.createAudio.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.controlAudio = this.controlAudio.bind(this);
  }

  createAudio(link, track) {
    var audio = new Audio(link);
    audio.addEventListener('loadedmetadata', () => {
      track.duration = audio.duration;
    });
    return audio;
  }

  controlAudio() {
    state.time = '0:00';
    state.width = '';
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.currentTime = 0;
      state.trackList[i].audio.pause();
    }
  }

  formatTime(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = '0' + String(seconds);
    }
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div className="trackList-main">
        {state.trackList.map((track) => {
          track.audio = this.createAudio(track.url, track);
          return (
            <div
              onClick={() => {
                state.isPlaying = false;
                state.index = track.index;
                this.controlAudio();
              }}
              className="track-container">
              <div className="track-container__image"></div>
              <div className="track-container__title">
                <span className="track-container__title__name">{track.name}</span>
                <span className="track-container__title__author">{track.author}</span>
              </div>
              <span className="track-container__duration"> {this.formatTime(track.duration)}</span>
              <div className="track-container__menu"></div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default view(TrackList);
