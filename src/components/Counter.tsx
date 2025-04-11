import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(69);

  return (
    <>
      <p>We clicked {count} times!</p>
      <button
        type="button"
        className="button"
        onClick={() => setCount(count + 1)}
      >
        Add 1
      </button>
      <button
        type="button"
        className="buttonMinus"
        onClick={() => setCount(count - 1)}
      >
        Minus 1
      </button>
    </>
  );
};
export default Counter;
