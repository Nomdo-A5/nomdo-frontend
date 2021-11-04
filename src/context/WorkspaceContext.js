import React, { useState, useEffect } from 'react'
import { getToken } from '../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';


export const WorkspaceContext = React.createContext(null);
export const WorkspaceContextProvider = (props) => {

    const [workspace, setWorkspace] = useState([]);

    const GetWorkspace = async () => {
        const token = getToken();
        const response = await axios.get(BASE_API_URL + 'workspace', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setWorkspace(response.data.workspace);
        console.log(response);
    };
    useEffect(() => {
        GetWorkspace()
    }, [])

    return <WorkspaceContext.Provider value={{
        workspace, setWorkspace
    }}>
        {props.children}
    </WorkspaceContext.Provider>
}