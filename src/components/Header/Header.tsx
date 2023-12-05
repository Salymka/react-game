import * as React from "react";

import styles from "./Header.module.scss";
import DropDown from "../DropDown/DropDown";

interface IHeaderProps {
  changePoolSize: (size: number) => void;
  startNewGame: () => void;
}

const Header: React.FC<IHeaderProps> = ({ changePoolSize, startNewGame }) => {
  return (
    <div className={styles.header__wrapper}>
      <div className={styles.header}>
        <h2>X-ZERO</h2>
        <div className={styles.header__tools}>
          <DropDown onSelectBoardSize={(value) => changePoolSize(value)} />
          <button className={styles.header__newGameBtn} onClick={startNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
