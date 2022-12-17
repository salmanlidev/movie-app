import { useState, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"



export const AuthPage = () => {
    const { logIn, error, auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [key, setKey] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(key)
        setKey("")
    }
    if (!auth) {
        return (
            <form className="h-full flex flex-col gap-5 items-center justify-center bg-zinc-800" onSubmit={(e) => handleSubmit(e)}>
                <h1 className="error bg-yellow-500">Movie App Auth Page</h1>
                {
                    error === 401 ? <h1 className="error">Invalid Api Key</h1> : null
                }
                <input placeholder="set api key..." className="focus-within:outline-none w-2/3 h-9 rounded-xl px-5 text-xl" type="text" value={key} onChange={(e) => setKey(e.target.value)} />
            </form>
        )

    }
    else{
        return <Navigate to="/" />
    }
}