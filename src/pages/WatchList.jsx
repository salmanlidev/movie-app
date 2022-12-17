import { useContext } from "react"
import MovieItem from "../components/MovieItem";
import { MovieContext } from "../context/MovieContext";

export const WatchList = () => {
    const { watchList } = useContext(MovieContext)

    console.log(watchList)
    return (
        <div className={`${watchList.length === 0 ? "h-[calc(100%-56px)]" : ""} flex flex-wrap bg-zinc-800 items-center justify-evenly gap-4 px-20 py-5`}>
            {watchList.length === 0 ?
                <h1 className="text-4xl text-white">Watch List Empty</h1> : watchList.map((movie, key) => {
                    return <MovieItem key={key} movie={movie} />
                })}

        </div>
    )
}
