/*
  Routing Page
*/

import Login from "./Login/Login";
import Structure from "./Structure";
import Dashboard from "./dashboard/Dashboard";
import Board from "./board/Board";
import Report from "./report/Report";
import Structure_Profile from "./Structure_Profile";
import Register from "./register/Register";
import Home  from "../pages/home/Home";
import UserProfile  from "../pages/userprofile/UserProfile";
import UserSetting  from "../pages/usersetting/UserSetting";
import BlankPage  from "../pages/blankpage/BlankPage";
import Workspace from "./workspace/Workspace";
export const APP_ROUTE = [
  {
    name: "Login",
    path: "/",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: Register,
    restricted: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    private: true,
  },
  {
    name: "Home",
    path: "/home",
    exact: true,
    component: Home,
    private: true,
  },
  {
    name: "Boards",
    path: "/board",
    exact: true,
    component: Board,
    private: true,
  },
  {
    name: "Report",
    path: "/report",
    exact: true,
    component: Report,
    private: true,
  },
  {
    name: "Members",
    path: "/Dashboard/Members",
    exact: true,
    component: Structure,
    private: true,
  },
  {
    name: "Workspace_Setting",
    path: "/Dashboard/Workspace_Setting",
    exact: true,
    component: Structure,
    private: true,
  },
  {
    name: "UserProfile",
    path: "/userprofile",
    exact: true,
    component: UserProfile,
    private: true,
  },
  {
    name: "UserSetting",
    path: "/usersetting",
    exact: true,
    component: UserSetting,
    private: true,
  },
  {
    name: "Workspace",
    path: "/workspace",
    exact: true,
    component: Workspace,
    private: true,
  },
];
