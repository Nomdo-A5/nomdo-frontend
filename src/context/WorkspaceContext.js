import React, { useState, useEffect } from 'react'
import { getToken } from '../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';


export const WorkspaceContext = React.createContext(null);

export const WorkspaceContextProvider = (props) => {

    const [workspace, setWorkspace] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState("");
    const token = getToken();

    const GetWorkspace = async () => {       
        const response = await axios.get(BASE_API_URL + 'workspace', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setWorkspace(response.data.workspace);
    };

    const GetWorkspaceById = async ($id) => {
        const response = await axios.get(BASE_API_URL+'workspace',{
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'id': $id
            }
        })
        setActiveWorkspace(response.data)        
    }

    useEffect(() => {
        GetWorkspace()
    }, [])

    return <WorkspaceContext.Provider value={{
        workspace, 
        setWorkspace,
        activeWorkspace,
        setActiveWorkspace,
        GetWorkspaceById
    }}>
        {props.children}
    </WorkspaceContext.Provider>
}