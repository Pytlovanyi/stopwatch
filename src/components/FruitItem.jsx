import React, { useState } from "react";
const FruitItem = () => {
  const fruits = [
    { id: 1, name: "🍎 Яблуко" },
    { id: 2, name: "🍌 Банан" },
    { id: 3, name: "🍇 Виноград" },
    { id: 4, name: "🍊 Апельсин" },
  ];
  const [globalVote, setGlobalVote] = useState(0);
  const handleGlobalVote = () => {
    setGlobalVote(globalVote + 1);
  };
  const clearGlobalVote = () => {
    setGlobalVote(0);
  };
  return (
    <>
      <div>
        <p>All vote = {globalVote}</p>
        <ul>
          {fruits.map((element) => (
            <FruitItem1
              onVote={handleGlobalVote}
              key={element.id}
              name={element.name}
              id={element.id}
            />
          ))}
        </ul>
        <button onClick={clearGlobalVote}>Clear all vote</button>
      </div>
    </>
  );
};
const FruitItem1 = (props) => {
  const [vote, setVote] = useState(0);
  const handleClick = () => {
    setVote(vote + 1);
    props.onVote();
  };
  return (
    <>
      <li key={props.id}>
        {props.name}- numbers of vote {vote}
        <button onClick={handleClick}>Vote</button>
      </li>
    </>
  );
};
export default FruitItem;
