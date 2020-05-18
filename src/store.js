import { store } from '@risingstack/react-easy-state';

const state = store({
  trackList: [
    { id: 1, index: 0, name: 'Godzilla', author: 'Eminem', url: './audio/EminemGodzilla.mp3', audio: '', duration: 0 },
    {
      id: 2,
      index: 1,
      name: 'Magnolia',
      author: 'Playboi Carti',
      url: './audio/PlayboiCartiMagnolia.mp3',
      audio: '',
      duration: 0,
    },
    { id: 3, index: 2, name: 'Lotto', author: 'Joyner Lucas', url: './audio/JoynerLucasLotto.mp3', audio: '', duration: 0 },
    { id: 4, index: 3, name: 'A&T', author: '21 savage', url: './audio/21savageAT.mp3', audio: '', duration: 0 },
  ],
  index: 0,
  isPlaying: false,
  time: '0:00',
  width: '',
  didMount: false,
  volume: 0,
});

export default state;
