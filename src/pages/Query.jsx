import axios from "axios"
import {  useContext, useEffect, useState } from "react"
import MovieItem  from "../components/MovieItem"
import { AuthContext } from "../context/AuthContext"

import { MovieContext } from "../context/MovieContext"


export const Query = () => {
    const { movies , setPage  } = useContext(MovieContext)
    const {error} = useContext(AuthContext)
   
    return (
        <div className="flex flex-wrap bg-zinc-800 items-center justify-evenly gap-4 px-20 py-5">
                {error === 500 ? <h1 className="error">Network Error</h1> : null}
                {error === 404 ? <h1 className="error">Not Found</h1> : null }
                {movies.map((movie, key) => {
                    return <MovieItem key={key} movie={movie} />
                })}
        </div>
    )
}