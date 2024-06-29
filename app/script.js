import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
const { formatTime, playBell } = require('./utils.js');
const { settings } = require('./settings.js');

const App = () => {

  const workTime = settings.workTime;
  const restTime = settings.restTime;
  
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(workTime);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    if (timer) {
      clearInterval(timer);
    }

    setStatus('work');
    let currStatus = 'work';
    const newTimer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          setStatus((prevStatus) => {
              currStatus = prevStatus === 'work' ? 'rest' : 'work';
              return prevStatus === 'work' ? 'rest' : 'work';
            }
          );
          return currStatus === 'rest' ? restTime : workTime; // 20 seconds break or 20 minutes work (1200 seconds)
        }
        console.log(prevTime-1);
        return prevTime - 1;
      });
    }, 1000);

    setTimer(newTimer);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setStatus('off');
    setTime(workTime); 
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  useEffect(() => {
    if (status !== 'off') {
      playBell();
    }
  }, [status]);

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time to rest.
          </p>
        </div>
      )}
      {
        status === 'work'
        &&
        <img
          src="./images/work.png"
          alt="Work"
        />
      }
      {
        status === 'rest'
        &&
        <img
          src="./images/rest.png"
          alt="Rest"
        />
      }
      {
        status !== 'off'
        &&
        (
        <div className="timer">
          {formatTime(time)}
        </div>
        )
      }
      {
        status === 'off'
        ? 
        (
          <button
            className="btn"
            onClick={startTimer}
          >
              Start
          </button>
        )
        :
        (
          <button
            className="btn"
            onClick={stopTimer}
          >
            Stop
          </button>
        )
      }
      <button
        className="btn btn-close" 
        onClick={() => window.close()}
      >
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
