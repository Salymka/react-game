import React, { useState, useEffect, useRef } from "react";

import styles from "./PlayerTimer.module.scss";

interface IPlayerTimerProps {
  isPlayerTurn: boolean;
  initialTime: number;
  onTimeUpdate: (timeToUpdate: number) => void;
}

const PlayerTimer: React.FC<IPlayerTimerProps> = ({
  isPlayerTurn,
  initialTime,
  onTimeUpdate,
}) => {
  const [startTime, setStartTime] = useState<number>(initialTime || Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  // console.log(initialTime);
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = window.setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime!;
        setElapsedTime(elapsed);
        onTimeUpdate(elapsed);
      }, 1000);
    };

    const stopTimer = () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    if (isPlayerTurn) {
      setStartTime(Date.now() - elapsedTime);
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isPlayerTurn, elapsedTime, onTimeUpdate, startTime]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const formattedTime = `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div className={styles.timer}>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default PlayerTimer;
