import * as React from "react";

import styles from "./ModalWindow.module.scss";

interface IModalWindow {
  closeModalWindow: () => void;
  timer: string;
  children: React.ReactNode | React.ReactChild;
}

const ModalWindow: React.FC<IModalWindow> = ({
  closeModalWindow,
  children,
  timer,
}) => {
  return (
    <>
      <div className={styles.darkBG} onClick={closeModalWindow} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>{children}</div>
          <div className={styles.modalHeader}>{`Used time: ${
            timer || "0:00"
          }`}</div>
          <button className={styles.modalWindow__ok} onClick={closeModalWindow}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
