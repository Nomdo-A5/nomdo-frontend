import React, { useState, useEffect } from "react";
import { getToken } from "../utils/authentication";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export const BoardContext = React.createContext(null)
export const BoardContextProvider = (props) => {
    const token = getToken();
    const [boards, setBoards] = useState([]);
    const [boardInfo, setBoardInfo] = useState([]);
    const [isBoardEmpty, setIsBoardEmpty] = useState(false)
    const [activeBoard, setActiveBoard] = useState("")

    const GetBoards = async ($workspaceId) => {
        try {
            const response = await axios.get(BASE_API_URL + 'boards', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    'workspace_id': $workspaceId
                }
            });
            
                setBoards(response.data.boards)
                setIsBoardEmpty(false)
        } catch (err) {
            setIsBoardEmpty(true)
        }

    }

    const GetBoardInformation = async ($board_id) => {
        console.log("GET INFORMATION ON BOARD CONTEXT")
        const response = await axios.get(BASE_API_URL + 'boards', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'board_id': $board_id
            }
        });
        console.log(response)
        setBoardInfo(response.data)
    }

    const GetBoardById = async ($workspace_id, $id) => {
        const response = await axios.get(BASE_API_URL + 'boards', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': $workspace_id,
                'id': $id
            }
        })
        console.log(response)
        setActiveBoard(response.data.boards)
    }

    return <BoardContext.Provider value={{
        boards,
        setBoards,
        GetBoards,
        boardInfo,
        setBoardInfo,
        GetBoardInformation,
        activeBoard,
        setActiveBoard,
        GetBoardById,
        isBoardEmpty, 
        setIsBoardEmpty
    }}>
        {props.children}
    </BoardContext.Provider>
}