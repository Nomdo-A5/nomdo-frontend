import React, { useState, useEffect } from "react";
import { getToken } from "../utils/authentication";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export const TaskContext = React.createContext(null)
export const TaskContextProvider = (props) => {
    const token = getToken();
    const [tasks, setTasks] = useState([])

    const getTask = async ($board_id) => {
        const response = await axios.get(BASE_API_URL + 'task', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'board_id': $board_id
            }
        })
        setTasks((previous) => {
            return [...previous, response.data.task]
        })
    }

    return <TaskContext.Provider value={{
        tasks,
        setTasks,
        getTask
    }}>
        {props.children}
    </TaskContext.Provider>
}