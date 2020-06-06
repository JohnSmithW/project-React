import { store } from '@risingstack/react-easy-state';
import tracks from './data/audios';

const state = store({
  trackList: tracks,
  index: 0,
  isPlaying: false,
  time: '0:00',
  width: '',
  playerReady: false,
  volume: 0,
});

export default state;
