import React, { useContext } from "react";
import { someText } from "./LightDarkTheme";
const ThemeBox = () => {
  const text = useContext(someText);
  return (
    <>
      <p>{text}</p>
    </>
  );
};
export default ThemeBox;
