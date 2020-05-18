import React from 'react';
import { view } from '@risingstack/react-easy-state';
import state from '../store';
import PlayBar from './PlayBar';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.formatTime = this.formatTime.bind(this);
    this.playPause = this.playPause.bind(this);
    this.runPlayBar = this.runPlayBar.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.rewind = this.rewind.bind(this);
    this.fastForward = this.fastForward.bind(this);
  }

  formatTime(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = '0' + String(seconds);
    }
    return minutes + ':' + seconds;
  }

  runPlayBar() {
    const interval = setInterval(() => {
      if (state.trackList[state.index].audio.currentTime <= state.trackList[state.index].duration) {
        state.time = this.formatTime(state.trackList[state.index].audio.currentTime);
        state.width = state.trackList[state.index].audio.currentTime / (state.trackList[state.index].duration / 100) + '%';
      }
      if (state.trackList[state.index].audio.currentTime >= state.trackList[state.index].duration) {
        clearInterval(interval);
        this.next();
      }
    }, 1);
  }

  playPause() {
    if (state.isPlaying) {
      state.trackList[state.index].audio.pause();
      state.isPlaying = false;
    } else {
      state.trackList[state.index].audio.play();
      state.isPlaying = true;
      this.runPlayBar();
    }
  }

  next() {
    this.runPlayBar();
    state.time = '0:00';
    state.width = '';
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.currentTime = 0;
      state.trackList[i].audio.pause();
    }
    state.index = state.index + 1;
    if (state.index > state.trackList.length - 1) {
      state.index = 0;
    }
    if (state.isPlaying) {
      state.trackList[state.index].audio.play();
    } else {
      state.trackList[state.index].audio.pause();
    }
  }

  previous() {
    state.time = '0:00';
    state.width = '';
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.currentTime = 0;
      state.trackList[i].audio.pause();
    }
    state.index = state.index - 1;
    if (state.index < 0) {
      state.index = state.trackList.length - 1;
    }
    if (state.isPlaying) {
      state.trackList[state.index].audio.play();
    } else {
      state.trackList[state.index].audio.pause();
    }
  }

  rewind() {
    state.time = '0:00';
    state.width = '';
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.currentTime = 0;
      state.trackList[i].audio.pause();
    }
    state.index = (state.trackList.length - (state.index - 2)) % state.trackList.length;

    if (state.isPlaying) {
      state.trackList[state.index].audio.play();
    } else {
      state.trackList[state.index].audio.pause();
    }
  }

  fastForward() {
    this.runPlayBar();
    state.time = '0:00';
    state.width = '';
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.currentTime = 0;
      state.trackList[i].audio.pause();
    }
    state.index = (state.index + 2) % state.trackList.length;
    if (state.isPlaying) {
      state.trackList[state.index].audio.play();
    } else {
      state.trackList[state.index].audio.pause();
    }
  }

  changeVolume(event) {
    var volume = event.target.value / 100;
    for (var i = 0; i < state.trackList.length; i++) {
      state.trackList[i].audio.volume = volume;
    }
  }

  render() {
    return (
      <div className="player-main">
        <PlayBar
          songName={`${state.trackList[state.index].author}: ${state.trackList[state.index].name}`}
          songTime={state.time}
          songDuration={this.formatTime(state.trackList[state.index].duration)}
        />
        <div className="player-container">
          <div onClick={this.rewind} className="player-container__item player-container__item_rewind"></div>
          <div onClick={this.previous} className="player-container__item player-container__item_back"></div>
          <div
            onClick={this.playPause}
            className={
              state.isPlaying
                ? 'player-container__item player-container__item_pause'
                : 'player-container__item player-container__item_play'
            }></div>
          <div onClick={this.next} className="player-container__item player-container__item_next"></div>
          <div onClick={this.fastForward} className="player-container__item player-container__item_fast-forward"></div>
          <input onChange={this.changeVolume} className="volume" type="range" />
        </div>
      </div>
    );
  }
}

export default view(Player);
