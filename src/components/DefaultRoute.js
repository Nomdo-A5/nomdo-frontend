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
import WorkspaceNull from "../pages/workspaceNull/WorkspaceNull";

export const DEFAULT_ROUTE = [
  
 
  {
    name: "Dashboard",
    path: "/workspace/:workspace_id/dashboards",
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
    name: "Workspace",
    path: "/workspace",
    exact: true,
    component: WorkspaceNull,
    private: true,
  },
  {
    name: "Boards",
    path: "/workspace/:workspace_id/boards",
    exact: true,
    component: Board,
    private: true,
  },
  {
    name: "BoardsTasks",
    path: "/workspace/:workspace_id/boards/:board_id/tasks",
    exact: true,
    component: BoardExtended,
    private: true,
  },
  {
    name: "Report",
    path: "/report/:workspace_id",
    exact: true,
    component: Report,
    private: true,
  },
  {
    name: "Member",
    path: "/member",
    exact: true,
    component: Member,
    private: true,
  },
  {
    name: "BoardExtended",
    path: "/BoardExtended",
    exact: true,
    component: BoardExtended,
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
];
