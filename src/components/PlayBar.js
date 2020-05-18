import React from 'react';
import { render } from 'react-dom';
import { view } from '@risingstack/react-easy-state';
import state from '../store';

class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.widthRef = React.createRef();
    this.elementRef = React.createRef();
    this.skip = this.skip.bind(this);
  }

  componentDidMount() {
    state.didMount = true;
  }

  skip(event) {
    var xPosition = event.pageX - this.elementRef.current.offsetLeft;
    var elementPosition = this.elementRef.current.offsetWidth;
    var time = (state.trackList[state.index].duration / 100) * xPosition;
    state.trackList[state.index].audio.currentTime = time / (elementPosition / 100);
    state.width = state.trackList[state.index].audio.currentTime / (state.trackList[state.index].duration / 100) + '%';
    this.widthRef.current.style.width = state.width;
  }

  render() {
    if (state.didMount) {
      this.widthRef.current.style.width = state.width;
    }
    return (
      <div onPlay={this.changeWidth} className="playBar-container">
        <span className="song-title">{this.props.songName}</span>
        <div onClick={this.skip} ref={this.elementRef} className="playBar-wrapper">
          <div ref={this.widthRef} className="playBar-wrapper__bar"></div>
        </div>
        <div className="play-time">
          <div className="play-time__start">{this.props.songTime}</div>
          <div className="play-time__end">{this.props.songDuration}</div>
        </div>
      </div>
    );
  }
}

export default PlayBar;
