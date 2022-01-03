import React, { useState, useEffect } from "react";
import { getToken } from "../utils/authentication";
import axios from "axios";
import { BASE_API_URL } from "../constants/urls";

export const BalanceContext = React.createContext(null)
export const BalanceContextProvider = (props) => {
    const token = getToken();
    const [balanceOverview, setBalanceOverview] = useState([])
    const [reportBalance, setReportBalance] = useState([])

    const GetBalanceOverview = async ($id) => {
        const response = await axios.get(BASE_API_URL + 'report/overview', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': $id
            }
        })
        setBalanceOverview(response.data)
    }

    const GetReportBalance = async ($id) => {
        const response = await axios.get(BASE_API_URL + 'report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'workspace_id': $id
            }
        })
        setReportBalance(response.data.balance)
    }

    return <BalanceContext.Provider value={{
        balanceOverview,
        setBalanceOverview,
        GetBalanceOverview,
        reportBalance, 
        setReportBalance,
        GetReportBalance
    }}>
        {props.children}
    </BalanceContext.Provider>
}