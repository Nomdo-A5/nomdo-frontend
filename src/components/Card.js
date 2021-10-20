import React, {useState} from 'react';
import EditTask from '../modals/EditTask';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <Link to="/Dashboard/Members" class = "card-wrapper mr-5">
            <div class = "task-holder">
                <span class = "card-header">{taskObj.Name}</span>
                <p className = "card-description">{taskObj.Description}</p>
                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <FaEdit class = "far fa-edit mr-3" onClick = {() => setModal(true)}></FaEdit>
                    <FaTrashAlt class="fas fa-trash" onClick = {handleDelete}></FaTrashAlt>
                </div>
            </div>
            <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </Link>
    );
};

export default Card;