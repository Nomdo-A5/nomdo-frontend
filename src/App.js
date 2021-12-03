import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Structure from "./components/Structure";
import Structure_Profile from "./components/Structure_Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { APP_ROUTE } from "./components/routes";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { WorkspaceContextProvider } from "./context/WorkspaceContext";
import { BoardContextProvider } from "./context/BoardContext";

const App = () => {
  return (
    <div className="App">
      <WorkspaceContextProvider>
        <BoardContextProvider>
          <BrowserRouter>
            <Switch>
              {APP_ROUTE.map((value, index) => {
                if (value.private) {
                  return (
                    <PrivateRoute
                      key={value.name}
                      component={value.component}
                      path={value.path}
                      exact={value.exact}
                    />
                  );
                } else {
                  return (
                    <PublicRoute
                      key={value.name}
                      restricted={value.restricted}
                      path={value.path}
                      component={value.component}
                      exact={value.exact}
                    />
                  );
                }
              })}
              {/* <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route path="/Dashboard" component={Structure} />
          <Route path="/User_Profile" component={Structure_Profile} /> */}
            </Switch>
          </BrowserRouter>
        </BoardContextProvider>

      </WorkspaceContextProvider>
    </div>
  );
};

export default App;