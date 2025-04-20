import React, { useState, createContext, use } from "react";
export const someText = createContext();
import ThemeBox from "./ThemeBox";
const LightDarkTheme = () => {
  const [buttonColor, setButtonColor] = useState("green");
  const [color, setColor] = useState("red");
  const [text, setText] = useState("text for green theme");
  const toggleButton = () => {
    setColor(() => (color == "green" ? "red" : "green"));
    setButtonColor(() => (buttonColor == "green" ? "red" : "green"));
    if (color == "green") {
      setText("text for green theme");
    } else {
      setText("text for red theme");
    }
  };
  document.body.style.background = color;
  return (
    <>
      <h2>Theme color :{color}</h2>
      <button style={{ background: buttonColor }} onClick={toggleButton}>
        change color
      </button>
      <someText.Provider value={text}>
        <ThemeBox text={text} />
      </someText.Provider>
    </>
  );
};

export default LightDarkTheme;
