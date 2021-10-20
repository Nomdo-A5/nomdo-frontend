import React from "react";
import "./style/Topbar.css";
import "./style/Boards.css";
import { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import { Link, useHistory } from "react-router-dom";
import { logout } from "../utils/authentication";

const Boards = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [boardList, setBoardList] = useState([])

  const _onLogout = () => {
    logout();
    history.replace("/");
  };
    
  useEffect(() => {
      let arr = localStorage.getItem("boardList")
     
      if(arr){
          let obj = JSON.parse(arr)
          setBoardList(obj)
      }
  }, [])


  const deleteTask = (index) => {
      let tempList = boardList
      tempList.splice(index, 1)
      localStorage.setItem("boardList", JSON.stringify(tempList))
      setBoardList(tempList)
      window.location.reload()
  }

  const updateListArray = (obj, index) => {
      let tempList = boardList
      tempList[index] = obj
      localStorage.setItem("boardList", JSON.stringify(tempList))
      setBoardList(tempList)
      window.location.reload()
  }

  const toggle = () => {
      setModal(!modal);
  }

  const saveTask = (taskObj) => {
      let tempList = boardList
      tempList.push(taskObj)
      localStorage.setItem("boardList", JSON.stringify(tempList))
      setBoardList(boardList)
      setModal(false)
  }

  return (
    <>
      <div className="container-main">
        <div className="container-add-box">
          <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Add New Boards</button>
        </div>
        <div className = "task-container">
          {boardList && boardList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
        </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
      </div>
    </>
  );
};

export default Boards;