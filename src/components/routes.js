/*
  Routing Page
*/

import Login from "../pages/Login/Login";
import Structure from "./Structure";
import Dashboard from "../pages/dashboard/Dashboard";
import Member from "../pages/member/Member";
import Board from "../pages/board/Board";
import BoardExtended from "../pages/boardExtended/BoardExtended";
import Report from "../pages/report/Report";
import Structure_Profile from "./Structure_Profile";
import Register from "../pages/register/Register";
import Home  from "../pages/home/Home";
import UserProfile  from "../pages/userprofile/UserProfile";
import UserSetting  from "../pages/usersetting/UserSetting";
import BlankPage  from "../pages/blankpage/BlankPage";
import Workspace from "../pages/workspaceNull/WorkspaceNull";

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
  }
];
