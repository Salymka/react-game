import React from "react";

import styles from "./DropDown.module.scss";

interface BoardSizeSelectorProps {
  onSelectBoardSize: (size: number) => void;
}

const DropDown: React.FC<BoardSizeSelectorProps> = ({ onSelectBoardSize }) => {
  const boardSizes = Array.from({ length: 7 }, (_, index) => index + 3); // Значення від 3 до 9

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = parseInt(event.target.value, 10);
    onSelectBoardSize(selectedSize);
  };

  return (
    <div>
      <label htmlFor="boardSize">Select Board Size: </label>
      <select
        id="boardSize"
        onChange={handleSelectChange}
        className={styles.select}
      >
        {boardSizes.map((size) => (
          <option key={size} value={size}>
            {`${size} x ${size}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
