import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { loadingDecorator } from "../../mobx/axios/loadingDecorator";

import styles from "./index.less";

@loadingDecorator
@inject("Example")
@observer
class Page extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={styles.red}>example{this.props.Example.dataSource}</div>
    );
  }
}
export default Page;
