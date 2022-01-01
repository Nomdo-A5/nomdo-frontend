import React, { useState, useEffect } from "react";
import { getToken } from "../utils/authentication";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export const UserContext = React.createContext(null)
export const UserContextProvider = (props) => {
    const token = getToken();
    const [user, setUser] = useState("")

    const getActiveUser = async () => {
        const token = getToken();
        const response = await axios.get(BASE_API_URL + 'user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
        setUser(response.data.user)
    }
    useEffect(() => {
        getActiveUser()
    }, [])
    return <UserContext.Provider value={{
        user,
        setUser,
        getActiveUser
    }}>
        {props.children}
    </UserContext.Provider>
}