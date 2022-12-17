import axios from "axios";
import { createContext, useState , useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";


export const MovieContext = createContext()

const MovieContextProvider = ({children}) => {
    const [movies , setMovies] = useState([])
    const [page , setPage] = useState(1)  
    
    //localStorage.getItem("watchList") ? JSON.parse(localStorage.getItem("watchList")) :
    const [ watchList , setWatchList ] = useState(() => localStorage.getItem("watchList") ? JSON.parse(localStorage.getItem("watchList")) : [])
    const {key , setError , auth , error} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&page=${page}`)
            .then(data => {
                setError(0)
                setMovies(prevState => [...prevState, ...data.data.results])
            })
            .catch(err => {
                if(err?.code === "ERR_NETWORK"){
                    // console.log("Error")
                    setError(500)
                }
            })
    }, [page , key])

    useEffect(() => {
        localStorage.setItem("watchList" , JSON.stringify(watchList))
    }  , [watchList])


    return (
        <MovieContext.Provider value={{movies , setPage , watchList  , setWatchList  , setMovies , page}}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider;