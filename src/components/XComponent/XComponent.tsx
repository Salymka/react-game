import React from "react";
import styles from "./XComponent.module.scss";

import xPng from "../../png/close.png";

function XComponent() {
  return (
    <>
      <img src={xPng} className={styles.cross} alt={"X"} />
    </>
  );
}

export default XComponent;
