import React from "react";
import { getToken } from "../utils/authentication";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export const BoardContext = React.createContext(null)
export const BoardContextProvider = (props) => {
    const token = getToken();
    const [boards,setBoards] = useState([]);
    
    const GetBoards = async ($workspaceId) => {
        const response = await axios.get(BASE_API_URL + 'workspace', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params:{
                'workspace_id' : $workspaceId
            }
        });
        setBoards(response.data.boards)
    }
    
    return <BoardContext.Provider value={{
        boards,
        setBoards,
        GetBoards
    }}>
        {props.children}
    </BoardContext.Provider>
}