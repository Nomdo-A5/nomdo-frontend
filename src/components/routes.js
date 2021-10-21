/*
  Routing Page
*/

import Login from "./Login/Login";
import Structure from "./Structure";
import Structure_Profile from "./Structure_Profile";

export const APP_ROUTE = [
  {
    name: "Login",
    path: "/",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    exact: true,
    component: Structure,
    private: true,
  },
  {
    name: "Boards",
    path: "/Dashboard/Boards",
    exact: true,
    component: Structure,
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
    name: "Balance",
    path: "/Dashboard/Balance",
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
];
