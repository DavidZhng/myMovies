import React, {useEffect, useState, useContext} from 'react'
import Movie from '../Movie'
import axios from 'axios';
import { userContext } from '../../App'

const MOVIEDB_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d6e80186a2e93e81f8437d28f4ce76cb&page=1"

const Home = ({movies, setMovies}) => {
    const [starredMovies, setStarredMovies] = useState([])
    const {state, dispatch} = useContext(userContext)
    useEffect(() => {
        if (state) {
            fetch(MOVIEDB_API)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
            })
            const user = JSON.parse(localStorage.getItem("user"))
        
            const url = "https://guarded-forest-32502.herokuapp.com/users/getMovies"
            const credentials = {
                id: user._id
            }
            axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                setStarredMovies(result.map((movie) => (
                    movie.id
                    )))
                })
                .catch((error) => {
                    console.log(error)
            });
        }
    }, [setMovies]);

    return (
        <div className = "movie-container">
            {movies.map((movie) => (
                <Movie setStarredMovies = {setStarredMovies} isStarred = {starredMovies.indexOf(movie.id) > -1} key = {movie.id} {...movie}/>
            ))}
        </div>
    )
}

export default Home