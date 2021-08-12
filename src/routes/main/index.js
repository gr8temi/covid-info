import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../../containers/home"));
const Country = lazy(() => import("../../containers/country"));

const App = () => (
  <Suspense fallback={"loading"}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/country/:countryName" component={Country} />

    </Switch>
  </Suspense>
);

export default App;
