import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const {auth} = useContext(AuthContext)
    // console.log(auth)
    return auth ? <Outlet /> : <Navigate to="/auth" /> ;
}