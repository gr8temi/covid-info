import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../../containers/Home"));

const App = () => (
  <Suspense fallback={"loading"}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Suspense>
);

export default App;
