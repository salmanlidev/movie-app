import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { MovieContext } from "../context/MovieContext"
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {CgClose} from "react-icons/cg";

export const Header = () => {
    const navigate = useNavigate()
    const { logOut, key, setError } = useContext(AuthContext)
    const { setMovies, page } = useContext(MovieContext)
    const [query, setQuery] = useState("")
    const [hamburger , setHamburger] = useState(false);


    const handleForm = (e) => {
        e.preventDefault()
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`)
            .then(data => {
                setError(0)
                setMovies(data.data.results)
                if (data?.data?.results?.length === 0) {
                    setError(404)
                }
            })
            .catch(err => {
                if (err?.response.status === 404) {

                }

            })
        navigate(`/query/${query}`)
        setQuery("")
    }


    return (
        <header className="navbar">
            <a href="/" className="text-2xl text-white">Home</a>
            <button className="navbar-hamburger" onClick={() => setHamburger(!hamburger)}>
                {hamburger ? <CgClose /> : <GiHamburgerMenu />}
            </button>
            <div className={`nav-control ${hamburger ? "opacity-100 flex" : ""}`}>
                <form onSubmit={handleForm} className="navbar-form">
                    <input value={query} onChange={(e) => setQuery(e.target.value)} className="navbar-form-input" />
                    <button type="submit" className="navbar-form-button" onSubmit={handleForm}><FaSearch /></button>
                </form>
                <div className="navbar-buttons">
                    <button onClick={() => navigate("/watchList")} type="button" className="bg-red-600 w-28 h-8 rounded-xl text-white text-xl">WatchList</button>
                    <button onClick={logOut} type="button" className="bg-yellow-600 w-28 h-8 rounded-xl text-white text-xl">Log Out</button>
                </div>
            </div>


        </header>
    )
}