import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

import {MdOutlineArrowBackIosNew} from "react-icons/md";
import { Spin } from "../components/Spin";

export const MovieDetail = () => {
    const { key } = useContext(AuthContext)
    const params = useParams()
    const [movie, setMovie] = useState()
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}}?api_key=${key}&language=en-US`)
            .then(data => setMovie(data.data))
    }, [])
    const navigate = useNavigate()

    // console.log(movie)
    return (
        <div className="w-full bg-zinc-800 flex items-center justify-center" style={{ height: "calc(100% - 56px)" }}>
            {movie ? <div className="w-full flex bg-no-repeat bg-cover bg-center  bg-opacity-40 border-2 border-yellow-600" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})` }} >
                <div className="movie-detail">
                    <img src={"https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + movie.poster_path} alt="poster" className="w-[300px] shadow-xl" />
                    <div className="detail-content">
                    <button onClick={() => navigate("/")} type="button" className="-mt-16 flex items-center justify-center bg-zinc-600 w-40 text-center text-xl text-white rounded-xl"><MdOutlineArrowBackIosNew />Back To Home</button>
                        <h1 className="text-gray-300 text-2xl font-bold">{movie.title}  <span>({movie.release_date
                            .split("-")[0]})</span></h1>
                        <div className="detail-average">
                            <h4 className="w-16 font-bold h-10 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-2xl">{parseFloat(movie.vote_average).toFixed(1)}</h4>
                        </div>
                        <h2 className="text-white text-3xl font-bold">Overview</h2>
                        <p className="text-white">
                            {movie.overview}
                        </p>
                        <a href={movie?.homepage} target="_blank" className="bg-yellow-600 w-32 text-center text-xl text-white rounded-xl mt-10">Get Movie</a>
                    </div>
                </div>

            </div> : <Spin/>}

        </div>
    )
}
