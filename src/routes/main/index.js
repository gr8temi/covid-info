import { Spin } from "antd";
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../../containers/home"));
const Country = lazy(() => import("../../containers/country"));
const App = () => (
  <Suspense
    fallback={
      <div
        style={{
          display: "flex",
          height: "inherit",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" style={{ textAlign: "center" }} />
      </div>
    }
  >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/country/:countryName" component={Country} />
    </Switch>
  </Suspense>
);

export default App;
