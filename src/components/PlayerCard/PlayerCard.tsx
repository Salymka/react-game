import * as React from "react";
import IPlayer, { Figurs } from "../../interfaces/IPlayer";
import styles from "./PlayerCard.module.scss";
import PlayerTimer from "../PlayerTimer/PlayerTimer";

interface IPlayerCardProps {
  player: IPlayer;
  onUponTimeUpdate: (time: number) => void;
  UpdatePlayerName: (name: string, lastName: string) => void;
}

const PlayerCard: React.FC<IPlayerCardProps> = ({
  player,
  onUponTimeUpdate,
  UpdatePlayerName,
}) => {
  const changePlayerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName: string = event.target.value;
    UpdatePlayerName(newName, player.name);
  };

  return (
    <div className={styles.playerCard}>
      <input
        value={player.name}
        onChange={changePlayerName}
        className={styles.playerCard__playerName}
      />
      <div className={styles.playerCard__figure}>
        <p>{`Figure: ${player.figure === Figurs.figureX ? "X" : "O"}`}</p>
      </div>
      <div className={styles.playerCard__timer}>
        <p>Player used time: </p>
        <PlayerTimer
          isPlayerTurn={player.haveToMove}
          initialTime={player.timer}
          onTimeUpdate={onUponTimeUpdate}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
