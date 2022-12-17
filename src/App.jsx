import { useState, useEffect, useContext } from 'react'
import { Routes , Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { Home } from './pages/Home';
import { HomeLayout } from './pages/HomeLayout';
import { MovieDetail } from './pages/MovieDetail';
import { Query } from './pages/Query';
import { WatchList } from './pages/WatchList';
import { PrivateRoute } from './utils/PrivateRoute';


const App = () => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(0);
  const { key } = useContext(AuthContext)
  //! 6c277d9768197eadbd6e87a92defdbfc

  // localStorage.setItem("api_key" , JSON.stringify("6c277d9768197eadbd6e87a92defdbfc"))

  // useEffect(() => {
  //   fetch(`
  //   https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`)
  //     .then((response) => response.json())
  //     .then(data => setMovie(data.results))
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  // {movie.map(mov => {
  //   return <h1 key={mov.id}>{mov.title}</h1>
  // })}  
  
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
            <Route element={<HomeLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/movieDetail/:id' element={<MovieDetail />} />
              <Route path='/query/:query' element={<Query />} />
              <Route path='/watchList' element={<WatchList />} />
            </Route>
        </Route>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>    
    </>
  )
}

export default App
