import React, { useState } from "react";
import styles from "./App.module.scss";
import GamePool from "./components/GamePool/GamePool";
import IPlayer, { Figurs } from "./interfaces/IPlayer";
import Header from "./components/Header/Header";
import PlayerCard from "./components/PlayerCard/PlayerCard";

interface gameInfo {
  winner: IPlayer | "No one, try again" | null;
  isGamePlay: boolean;
  newGamePoolSize: number;
}

function App() {
  const [poolSize, setPoolSize] = useState<number>(3);
  const [isStartNewGame, setIsStartNewGame] = useState<boolean>(true);
  const [gameInfo, setGameInfo] = useState<gameInfo>({
    winner: null,
    isGamePlay: false,
    newGamePoolSize: 3,
  });

  const [firstPlayer, setFirstPlayer] = useState<IPlayer>({
    name: "newPlayer1",
    timer: 0,
    figure: Figurs.figureX,
    winningsAmount: 0,
    haveToMove: true,
  });

  const [secondPlayer, setSecondPlayer] = useState<IPlayer>({
    name: "newPlayer2",
    timer: 0,
    figure: Figurs.figureZero,
    winningsAmount: 0,
    haveToMove: false,
  });

  const togleTimer = () => {
    setFirstPlayer((prev) => {
      return { ...prev, haveToMove: !prev.haveToMove };
    });
    setSecondPlayer((prev) => {
      return { ...prev, haveToMove: !prev.haveToMove };
    });
  };

  const onUponTimeUpdate = (time: number) => {
    if (firstPlayer.haveToMove) {
      setFirstPlayer((prev) => ({ ...prev, timer: time }));
      return;
    }
    setSecondPlayer((prev) => ({ ...prev, timer: time }));
  };

  const updatePlayerName = (newName: string, lastName: string) => {
    if (firstPlayer.name === lastName)
      return setFirstPlayer((prev) => ({ ...prev, name: newName }));
    if (secondPlayer.name === lastName)
      return setSecondPlayer((prev) => ({ ...prev, name: newName }));
  };

  const startTimer = () => {
    setFirstPlayer((prev) => ({ ...prev, haveToMove: true }));
  };

  const startNewGame = () => {
    setFirstPlayer((prev) => ({ ...prev, timer: 0, haveToMove: false }));
    setSecondPlayer((prev) => ({ ...prev, timer: 0, haveToMove: false }));
    setPoolSize(gameInfo.newGamePoolSize);
    setIsStartNewGame(true);
    startTimer();
  };

  return (
    <div className={styles.App}>
      <Header
        changePoolSize={(value) =>
          setGameInfo((prev) => ({ ...prev, newGamePoolSize: +value }))
        }
        startNewGame={startNewGame}
      />
      <div className={styles.container}>
        <div className={styles.players__wraper}>
          <PlayerCard
            player={firstPlayer}
            onUponTimeUpdate={onUponTimeUpdate}
            UpdatePlayerName={updatePlayerName}
          ></PlayerCard>
          <PlayerCard
            player={secondPlayer}
            onUponTimeUpdate={onUponTimeUpdate}
            UpdatePlayerName={updatePlayerName}
          ></PlayerCard>
        </div>
        <div className={styles.playzone}>
          <GamePool
            newGame={() => setIsStartNewGame(false)}
            isNewGame={isStartNewGame}
            size={poolSize}
            player1={firstPlayer}
            player2={secondPlayer}
            toggleTimer={togleTimer}
          ></GamePool>
        </div>
      </div>
    </div>
  );
}

export default App;
