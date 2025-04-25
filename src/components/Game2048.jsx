import React, { useEffect, useRef, useState } from "react";

const Game2048 = () => {
  const [numbersOnTheDesk, setNumbersOnTheDesk] = useState(Array(16).fill(""));
  const numberRef = useRef(numbersOnTheDesk);
  const hasWin = useRef(false);
  const [score, setScore] = useState(0);
  const oldTable = useRef(0);
  const currentScore = useRef(0);
  const oldScore = useRef(0);

  const reset = () => {
    const emptyDesk = Array(16).fill("");
    setNumbersOnTheDesk(emptyDesk);
    numberRef.current = emptyDesk;
    setScore(0);
    hasWin.current = false;
  };

  const undo = () => {
    if (oldTable.current !== 0) {
      setNumbersOnTheDesk(oldTable.current);
      setScore(oldScore.current);
    }
  };

  useEffect(() => {
    currentScore.current = score;
  }, [score]);

  useEffect(() => {
    if (numbersOnTheDesk.every((cell) => cell === "")) {
      startGame();
    }
  }, [numbersOnTheDesk]);

  const startGame = () => {
    let countOnTheStart = Math.random() > 0.5 ? 1 : 2;
    let newNumbersOnTheDesk = [...numbersOnTheDesk];
    let emptyIndex = newNumbersOnTheDesk
      .map((el, i) => (el == "" ? i : null))
      .filter((e) => e !== null);
    for (let i = 0; i < countOnTheStart; i++) {
      let rand = Math.floor(Math.random() * emptyIndex.length);
      let index = emptyIndex[rand];
      newNumbersOnTheDesk[index] = Math.random() > 0.5 ? 2 : 4;
      emptyIndex.splice(rand, 1);
    }
    setNumbersOnTheDesk(newNumbersOnTheDesk);
  };

  const addNewBox = () => {
    let newNumbersOnTheDesk = [...numberRef.current];
    let emptyIndex = newNumbersOnTheDesk
      .map((el, i) => (el == "" ? i : null))
      .filter((e) => e !== null);
    if (emptyIndex.length > 0) {
      let index = emptyIndex[Math.floor(Math.random() * emptyIndex.length)];
      newNumbersOnTheDesk[index] = Math.random() > 0.5 ? 2 : 4;
      setNumbersOnTheDesk(newNumbersOnTheDesk);
    }
  };
  useEffect(() => {
    numberRef.current = numbersOnTheDesk;
  }, [numbersOnTheDesk]);

  const moveVerical = (move) => {
    let newNumbersOnTheDesk = [...numberRef.current];
    for (let column = 0; column < 4; column++) {
      let oneColumn = newNumbersOnTheDesk.filter(
        (_, index) => index % 4 == column
      );
      let line = addTwinNumbers(oneColumn, move);
      for (let col = 0; col < line.length; col++) {
        newNumbersOnTheDesk[col * 4 + column] = line[col];
      }
    }
    checkChangeMove(newNumbersOnTheDesk, numberRef.current);
  };

  const moveHorizontal = (move) => {
    let newNumbersOnTheDesk = [...numberRef.current];
    for (let rows = 0; rows < newNumbersOnTheDesk.length; rows += 4) {
      let oneRow = newNumbersOnTheDesk.slice(rows, rows + 4);
      let line = addTwinNumbers(oneRow, move);
      for (let row = 0; row < line.length; row++) {
        newNumbersOnTheDesk[rows + row] = line[row];
      }
    }
    checkChangeMove(newNumbersOnTheDesk, numberRef.current);
  };

  const addTwinNumbers = (oneColumn, move) => {
    let line = oneColumn.filter((el) => el != 0);
    if (move == "reverse") line.reverse();
    for (let i = 0; i < line.length - 1; i++) {
      if (line[i] == line[i + 1]) {
        line[i] = line[i] * 2;
        line.splice(i + 1, 1);
      }
    }
    while (line.length < 4) line.push("");
    if (move == "reverse") line.reverse();
    return line;
  };

  const checkChangeMove = (newNumbersOnTheDesk, oldData) => {
    if (JSON.stringify(newNumbersOnTheDesk) !== JSON.stringify(oldData)) {
      oldTable.current = oldData;
      let yourScore = newNumbersOnTheDesk.reduce((ac, el) => {
        return ac + (el === "" ? 0 : el);
      }, 0);
      oldScore.current = currentScore.current;
      setScore(yourScore);
      setNumbersOnTheDesk(newNumbersOnTheDesk);
      setTimeout(() => {
        addNewBox();
      }, 0);
      if (!hasWin.current)
        setTimeout(() => {
          checkWin(newNumbersOnTheDesk, yourScore);
          checkLose();
        }, 100);
    }
  };

  const checkWin = (data, score) => {
    if (data.includes(2048)) {
      if (window.confirm(`You win! Your score: ${score}. Continue playing?`)) {
        hasWin.current = true;
      } else {
        reset();
      }
    }
  };

  const checkLose = () => {
    const board = [...numberRef.current];
    if (board.includes("")) return;
    for (let i = 0; i < 16; i++) {
      if (i % 4 !== 3 && board[i] === board[i + 1]) return; // справа
      if (i < 12 && board[i] === board[i + 4]) return; // знизу
    }
    alert(`You lose. Your score: ${currentScore.current}`);
    reset();
  };

  useEffect(() => {
    startGame();
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 38: // Вверх
          moveVerical("forward");
          break;
        case 40: // Вниз
          moveVerical("reverse");
          break;
        case 37: // Ліво
          moveHorizontal("forward");
          break;
        case 39: // Право
          moveHorizontal("reverse");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <p id="score-display">Your score: {score}</p>
      <div id="game-container">
        <div id="game-board" className="board">
          <Box value={numbersOnTheDesk} />
        </div>
      </div>
      <div>
        <button onClick={reset}>reset</button>
        <button onClick={undo}>undo</button>
      </div>
    </>
  );
};
const Box = (props) => {
  return props.value.map((element, index) => (
    <div key={index} className="tile" data-value={element}>
      {element}
    </div>
  ));
};
export default Game2048;
