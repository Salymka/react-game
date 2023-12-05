import React from "react";
import styles from "./OComponent.module.scss";

import oPng from "../../png/rec.png";

function OComponent() {
  return (
    <>
      <img src={oPng} className={styles.zero} alt={"O"} />
    </>
  );
}

export default OComponent;
