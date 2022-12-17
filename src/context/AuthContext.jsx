import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [key , setKey] = useState(localStorage.getItem("api_key") ? JSON.parse(localStorage.getItem("api_key")) : "")
    const [auth , setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : false)
    const [error , setError] = useState(0)
   

    useEffect(() => {
        if(localStorage.getItem("api_key") && error !== 401){
            localStorage.setItem("api_key" , JSON.stringify(key))
            localStorage.setItem("auth" , auth)
        }  
        if(!auth){
            localStorage.setItem("api_key" , JSON.stringify(key))
            localStorage.setItem("auth" , auth)
        }
    } , [key])

    const logIn = async (apiKey) => {
        try{
            await axios.get(`
            https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
            setKey(apiKey)
            setAuth(true)
            setError(0)
        }
        catch(error){
            if(error?.code === "ERR_NETWORK"){
                setError(500)
            }
            if(error?.response?.status === 401){
                setError(401)
                setAuth(false)
                setKey("")
            }
            console.log(error)
        }
    }
    
    
    const logOut = () => {
        localStorage.removeItem("api_key")
        localStorage.removeItem("auth")
        localStorage.removeItem("watchList")
        setKey("")
        setAuth(false)
    }
 
    return(
        <AuthContext.Provider value={{ logOut , logIn , error , auth , key , setError}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider