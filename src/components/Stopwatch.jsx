import React, { useRef, useState, useEffect } from "react";
const StopWatch = () => {
  const [timeFromStart, setTimeFromStart] = useState(0);
  const time = useRef(0);
  const timerRun = useRef(false);
  const timeFromBegin = useRef(0);
  const idInterval = useRef(null);
  useEffect(() => {
    setTimeFromStart(`00:00:00`);
  }, []);
  const startTime = () => {
    time.current = Date.now();
    if (!timerRun.current) {
      idInterval.current = setInterval(() => {
        setTimeFromStart(
          templateDate(Date.now() - time.current + timeFromBegin.current)
        );
      }, 1000);
    }
    timerRun.current = true;
  };
  const stopTime = () => {
    if (timerRun.current) {
      clearInterval(idInterval.current);
      timerRun.current = false;
      timeFromBegin.current += Date.now() - time.current;
    }
  };
  const resetTime = () => {
    setTimeFromStart(`00:00:00`);
    timerRun.current = false;
    timeFromBegin.current = 0;
    clearInterval(idInterval.current);
  };
  const templateDate = (data) => {
    let totalSeconds = Math.floor(data / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    const pad = (d) => (d < 10 ? "0" + d : d);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <h2>Your stopwatch</h2>
      <p>{timeFromStart}</p>
      <button onClick={startTime}>Start</button>
      <button onClick={stopTime}>Stop</button>
      <button onClick={resetTime}>Reset</button>
    </>
  );
};
export default StopWatch;
