export default function formatTime(duration) {
  var minutes = Math.floor(duration / 60);
  var seconds = Math.floor(duration % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  return minutes + ':' + seconds;
}
