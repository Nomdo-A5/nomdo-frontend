import "./style/Dashboard.css";
import "./style/Topbar.css";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../utils/authentication";
import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import './style/Card.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Dashboard = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [workspaceList, setWorkspaceList] = useState([])

  const _onLogout = () => {
    logout();
    history.replace("/");
  };
    
  useEffect(() => {
      let arr = localStorage.getItem("workspaceList")
     
      if(arr){
          let obj = JSON.parse(arr)
          setWorkspaceList(obj)
      }
  }, [])


  const deleteTask = (index) => {
      let tempList = workspaceList
      tempList.splice(index, 1)
      localStorage.setItem("workspaceList", JSON.stringify(tempList))
      setWorkspaceList(tempList)
      window.location.reload()
  }

  const updateListArray = (obj, index) => {
      let tempList = workspaceList
      tempList[index] = obj
      localStorage.setItem("workspaceList", JSON.stringify(tempList))
      setWorkspaceList(tempList)
      window.location.reload()
  }

  const toggle = () => {
      setModal(!modal);
  }

  const saveTask = (taskObj) => {
      let tempList = workspaceList
      tempList.push(taskObj)
      localStorage.setItem("workspaceList", JSON.stringify(tempList))
      setWorkspaceList(workspaceList)
      setModal(false)
  }

  return (
    <>
      <div className="container-main">
        <div className="container-add-box">
          <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Add New Workspace</button>
        </div>
        <div className = "task-container">
          {workspaceList && workspaceList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
        </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
      </div>
    </>
  );
};

export default Dashboard;