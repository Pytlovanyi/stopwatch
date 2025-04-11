import React, { useState, ChangeEvent } from "react";

const Form: React.FC = () => {
  const [acumulator, changeFunc] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeFunc(event.target.value);
  };
  return (
    <>
      <p>Your input = {acumulator}</p>
      <input type="text" value={acumulator} onChange={handleChange} />
    </>
  );
};
export default Form;
