const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

module.exports = {
    formatTime,
    playBell,
  };
