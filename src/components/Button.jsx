import React, { useState } from "react";
const Button = () => {
  const [color, setColor] = useState("#FFFFFF");
  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <div className="color-picker" style={{ backgroundColor: color }}></div>
      <input type="color" placeholder="input color" onChange={handleChange} />
    </>
  );
};
export default Button;
