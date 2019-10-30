import { observable, action, computed, configure, runInAction } from "mobx";
import axios from "axios";
configure({ enforceActions: "observed" });

export default class GlobalStore {
  @observable dataSource = "";
  @action.bound changeValue = objArr => {
    Object.keys(objArr).forEach(key => {
      // console.log(key,objArr[key])
      this[key] = objArr[key];
    });
  };
}
