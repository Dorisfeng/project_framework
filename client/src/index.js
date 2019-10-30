import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "mobx-react";
import Store from "./mobx/store/index";
import Example from "./pages/example";
import App from "./app";

const MyRouter = () => {
  return (
    <Provider {...Store}>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Example} />
          {/* <Route render={props => <BasicLayout {...props}/>}/> */}
        </Switch>
      </HashRouter>
    </Provider>
  );
};
ReactDOM.render(<MyRouter />, document.getElementById("root"));
