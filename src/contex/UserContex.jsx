import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({})

export function UserContexProvide({children}) {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        getUser()
    },[])

    const getUser = async ()=>{
        try {
            const res = await axios.get('http://localhost:5000/auth/refetch',{withCredentials:true})
            setUser(res.data)                              
            // console.log(res.data)                                                      
                                                                 

        } catch (error) {
            console.log(error)
        }
    }

    return (<UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>)
}