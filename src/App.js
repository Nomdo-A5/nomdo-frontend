import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import Structure from "./components/Structure";
import Structure_Profile from "./components/Structure_Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { APP_ROUTE } from "./components/routes";
import { DEFAULT_ROUTE } from "./components/DefaultRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { WorkspaceContextProvider } from "./context/WorkspaceContext";
import { BoardContextProvider } from "./context/BoardContext";
import DefaultPage from "./pages/defaultPage/DefaultPage"
import { UserContextProvider } from "./context/UserContext";
const App = () => {
  //document.title = 'Nomdo'
  return (
    <div className="App">
      <UserContextProvider>
        <WorkspaceContextProvider>
          <BoardContextProvider>
            <Router>
              <Switch>
                {APP_ROUTE.map((val) => (
                  <PublicRoute
                    key={val.name}
                    path={val.path}
                    exact={val.exact}
                    component={val.component}
                    restricted={val.restricted}
                  />
                ))}
                <Route exact path={["/home", "/member", "/workspace", "/workspace/*", "/BoardExtended", "/userprofile", "/usersetting", "/report/*"]}>
                  <DefaultPage>
                    <Switch>
                      {DEFAULT_ROUTE.map((val) => (
                        <PrivateRoute
                          key={val.name}
                          path={val.path}
                          exact={val.exact}
                          component={val.component}
                          private={val.private}
                        />
                      ))}
                    </Switch>
                  </DefaultPage>
                </Route>
              </Switch>
            </Router>
          </BoardContextProvider>
        </WorkspaceContextProvider>
      </UserContextProvider>

    </div>
  );
};

export default App;