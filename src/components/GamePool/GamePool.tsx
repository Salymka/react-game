import React, { useState, useEffect } from "react";

import styles from "./GamePool.module.scss";
import IPlayer, { Figurs } from "../../interfaces/IPlayer";
import XComponent from "../XComponent/XComponent";
import OComponent from "../OComponent/OComponent";
import ModalWindow from "../ModalWindow/ModalWindow";

type SquareValue = Figurs | null;

interface IGamePoolProps {
  size: number;
  player1: IPlayer;
  player2: IPlayer;
  toggleTimer: () => void;
  newGame: () => void;
  isNewGame: boolean;
}

const GamePool: React.FC<IGamePoolProps> = ({
  size,
  player1,
  player2,
  toggleTimer,
  newGame,
  isNewGame,
}) => {
  const [board, setBoard] = useState<Array<SquareValue>>(
    Array(size * size).fill(null)
  );
  const [activePlayer, setActivePlayer] = useState<IPlayer | null>(player1);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  useEffect(() => {
    if (isNewGame === true) {
      setBoard(Array(size * size).fill(null));
      newGame();
    }
    newGame();
  }, [isNewGame]);
  const calculateWinner = (
    squares: SquareValue[],
    size: number
  ): SquareValue | "draw" => {
    const lines: number[][] = [];

    // Додаємо рядки
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, index) => index + i * size));
    }

    // Додаємо стовпці
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, index) => index * size + i));
    }

    // Додаємо головну діагональ
    lines.push(Array.from({ length: size }, (_, index) => index * (size + 1)));

    // Додаємо побічну діагональ
    lines.push(
      Array.from({ length: size }, (_, index) => (index + 1) * (size - 1))
    );

    for (const line of lines) {
      const valuesInLine = line.map((index) => squares[index]);

      // Переможець, якщо всі значення в лінії однакові
      if (valuesInLine.every((value) => value === Figurs.figureX)) {
        // setIsModalWindow(true);
        return Figurs.figureX;
      } else if (valuesInLine.every((value) => value === Figurs.figureZero)) {
        // setIsModalWindow(true);
        return Figurs.figureZero;
      }
    }

    const isBoardFull = squares.every((value) => value !== null);

    if (isBoardFull) {
      return "draw"; // Нічия
    }

    return null;
  };

  const [isModalWindow, setIsModalWindow] = useState<boolean>(false);

  const winner: SquareValue | "draw" = calculateWinner(board, size);

  const status = winner
    ? winner !== "draw"
      ? `Winner: ${winner === Figurs.figureX ? player1.name : player2.name}`
      : "It's a draw, try again."
    : `Next player:\xa0\xa0 ${xIsNext ? player1.name : player2.name}`;

  // if(winner){return setIsModalWindow(true)}

  const handleClick = (index: number) => {
    if (activePlayer === player1) {
      setActivePlayer(player2);
    } else {
      setActivePlayer(player1);
    }

    toggleTimer();

    const newBoard = [...board];

    // Перевірка, чи клітинка вже зайнята чи гра вже закінчилася
    if (newBoard[index] || calculateWinner(newBoard, size)) {
      return;
    }

    // Постановка "X" або "O" в клітинку
    newBoard[index] = xIsNext ? Figurs.figureX : Figurs.figureZero;

    // Оновлення стану гри
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => {
    return (
      <button
        className={styles.square}
        style={{ width: `calc(100%/${size})` }}
        onClick={() => handleClick(index)}
      >
        {board[index] === Figurs.figureX ? (
          <XComponent />
        ) : board[index] ? (
          <OComponent />
        ) : (
          ""
        )}
      </button>
    );
  };

  const renderRow = (start: number, end: number) => {
    const row = [];

    for (let i = start; i < end; i++) {
      row.push(renderSquare(i));
    }

    return (
      <div className={styles.board_row} key={start}>
        {row}
      </div>
    );
  };

  const renderBoard = () => {
    const boardRows = [];

    for (let i = 0; i < size; i++) {
      const start = i * size;
      const end = start + size;
      boardRows.push(renderRow(start, end));
    }

    return <div className={styles.board}>{boardRows}</div>;
  };

  return (
    <div>
      {isModalWindow && (
        <ModalWindow
          closeModalWindow={() => setIsModalWindow(false)}
          timer={
            winner === Figurs.figureX
              ? formatTime(player1.timer)
              : winner === Figurs.figureZero
              ? formatTime(player2.timer)
              : formatTime(+player1.timer + +player2.timer)
          }
        >
          {status}
        </ModalWindow>
      )}
      <div className={styles.status}>{status}</div>

      {renderBoard()}
    </div>
  );
};

const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const formattedTime = `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
  return formattedTime;
};

export default GamePool;
