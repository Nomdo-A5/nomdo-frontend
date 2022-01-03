import React, { useState, useEffect } from 'react'
import { getToken } from '../utils/authentication';
import axios from 'axios';
import { BASE_API_URL } from '../constants/urls';


export const WorkspaceContext = React.createContext(null);

export const WorkspaceContextProvider = (props) => {

    const [workspace, setWorkspace] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState("");
    const [workspaceMembers, setWorkspacemembers] = useState([]);
    const [workspaceTaskOverview, setWorkspaceTaskOverview] = useState([])
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
        const response = await axios.get(BASE_API_URL + 'workspace', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'id': $id
            }
        })
        setActiveWorkspace(response.data)
    }

    const GetBoardInformation = async ($id) => {
        const response = await axios.get(BASE_API_URL + 'workspace/board-information', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'id': $id
            }
        })
    }

    const GetMember = async ($id) => {
        const response = await axios.get(BASE_API_URL + 'workspace/member', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': $id
            }
        })
        setWorkspacemembers(response.data.member)
    }

    const GetTaskOverview = async ($id) => {
        const response = await axios.get(BASE_API_URL + 'workspace/task-information', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': $id
            }
        })
        setWorkspaceTaskOverview(response.data)
    }


    useEffect(() => {
        GetWorkspace()
    }, [])

    return <WorkspaceContext.Provider value={{
        workspace,
        setWorkspace,
        activeWorkspace,
        setActiveWorkspace,
        GetWorkspaceById,
        GetBoardInformation,
        workspaceMembers, 
        setWorkspacemembers,
        GetMember,
        workspaceTaskOverview, 
        setWorkspaceTaskOverview,
        GetTaskOverview
    }}>
        {props.children}
    </WorkspaceContext.Provider>
}