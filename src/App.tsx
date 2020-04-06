import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/Main";
import PageNotFound from "./components/PageNotFound";
import Restaurant from "./components/Restaurant";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/restaurant/:id"
            render={(props) => <Restaurant {...props} />}
          />
          <Route exact path="/404" component={PageNotFound} />
          <Route exact path={"/"} component={Main} />
          <Redirect to={"/"} />
        </Switch>
      </>
    );
  }
}

export default App;
