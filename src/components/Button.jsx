import React, { useEffect, useState } from "react";
const Button = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const drawTime = () => {
    let welcome;
    let backgroundBody;
    const pad = (data) => {
      return data < 10 ? "0" + data : data;
    };
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if (hours > 5 && hours < 12) {
      welcome = "Good morning";
      backgroundBody = "green";
    }
    if (hours > 12 && hours < 18) {
      welcome = "Good day";
      backgroundBody = "red";
    }
    if (hours > 18 && hours < 23) {
      welcome = "Good evening";
      backgroundBody = "yellow";
    }
    if (hours > 23 || hours < 5) {
      welcome = "Good night";
      backgroundBody = "pink";
    }
    return {
      welcome,
      backgroundBody,
      timeString: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    };
  };

  return (
    <div>
      <BackgroundStyle bodyBackground={drawTime().backgroundBody} />
      <h1>Timer</h1>
      <p>{drawTime().welcome}</p>
      <p>{drawTime().timeString} </p>
    </div>
  );
};
const BackgroundStyle = ({ bodyBackground }) => {
  useEffect(() => {
    document.body.style.background = bodyBackground;
  }, [bodyBackground]);

  return null;
};
export default Button;
