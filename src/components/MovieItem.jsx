import { useEffect, useState, useRef, useContext } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { BsSuitHeartFill, BsHeart } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";

const MovieItem = ({ movie }) => {
    const { setWatchList, delWatch  , watchList} = useContext(MovieContext)
    const navigate = useNavigate()
    const post = {
        id: movie.id,
        title: movie.title,
        poster_path: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + movie.poster_path,
    }
    //! Poster https://www.themoviedb.org/t/p/w300_and_h450_bestv2/
    const getDetail = () => {
        navigate(`/movieDetail/${movie.id}`)
    }

    const curPost = watchList.find(o => o.id === post.id)
    

    const handleButton = () => {
        if(curPost){
            setWatchList(prev => [...prev.filter(o => o.id !== post.id)])
        }
        else{
            setWatchList([...watchList , post])
        }
    }

    return (
        <div className="w-[300px] shrink-0 relative group">
            <img className="w-full" src={"https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + movie.poster_path} alt="poster"
            />
            <div className="opacity-0 group-hover:opacity-100 bg-opacity-70 duration-300 absolute inset-0 bottom-0 flex flex-col gap-7 justify-center items-center text-xl bg-gray-700 text-white font-semibold text-center">

                <button onClick={handleButton} type="button" className="text-lg border p-1 text-yellow-500  border-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors rounded-xl">{curPost ? "Delete" : "Add"}</button>
                <h3>{movie.title}</h3>
                <button onClick={getDetail} type="button" className="w-32 h-10 flex items-center justify-center text-2xl text-white bg-yellow-600 rounded-2xl shadow-xl">Details</button>
            </div>
        </div>
    )
}

export default MovieItem;