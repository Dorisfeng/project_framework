import React from "react";
import styles from "./app.less";
import img from "./images/bg1的副本.jpg";

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.text}>
        Hello Webpack<i className={styles.iconfont}>&#xe600;</i>
      </h1>
      <img className={styles.background} src={img} alt="" />
      {console.log("I cannot print to console!")}
    </div>
  );
}
export default App;
