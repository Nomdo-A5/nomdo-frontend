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
    name: "User_Profile",
    path: "/User_Profile",
    exact: true,
    component: Structure_Profile,
    private: true,
  },
  {
    name: "User_Setting",
    path: "/User_Profile/User_Setting",
    exact: true,
    component: Structure_Profile,
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
