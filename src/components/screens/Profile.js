import React, {useEffect, useState} from 'react'
import Movie from '../Movie'
import axios from 'axios';

const Profile = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        
        const url = "https://guarded-forest-32502.herokuapp.com/users/getMovies"
        const credentials = {
            id: user._id
        }
        console.log(credentials)
        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            console.log(result)
            setMovies(result)
            })
            .catch((error) => {
                console.log(error)
        });

    }, [])
    return (
        <div className = "movie-container">
        {movies.map((movie) => (
            <Movie key = {movie.id} {...movie} />
        ))}
    </div>
    )
}

export default Profile