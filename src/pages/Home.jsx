import axios from "axios"
import {  useContext, useEffect, useState } from "react"
import MovieItem  from "../components/MovieItem"
import { AuthContext } from "../context/AuthContext"
//! import { AuthContext } from "../context/AuthContext"
import { MovieContext } from "../context/MovieContext"

// const MovieItem = lazy(() => import("../components/MovieItem"))

export const Home = () => {
    const { movies , setPage  } = useContext(MovieContext)
    const {error} = useContext(AuthContext)
    
    // const [movies, setMovies] = useState([])
    // const { key } = useContext(AuthContext)
    // const [page, setPage] = useState(1)

    // useEffect(() => {
    //     axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&page=${page}`)
    //         .then(data => setMovies(prevState => [...prevState, ...data.data.results]))
    // }, [page])

    // console.log(movies)
    // console.log(error)
    return (
        <div className="flex flex-wrap bg-zinc-800 items-center justify-evenly gap-4 px-20 py-5">
                {error === 500 ? <h1 className="error">Network Error</h1> : null}
                {movies.map((movie, key) => {
                    return <MovieItem key={key} movie={movie} />
                })}
            <div className="w-full flex justify-center pr-5 py-5">
                <button onClick={() => setPage(prev => prev + 1)} type="button" className="w-32 h-10 bg-yellow-600 text-white text-lg rounded-2xl">Show More...</button>
            </div>
        </div>
    )
}