import React from 'react'
import axios from 'axios';
const IMG_API = "https://image.tmdb.org/t/p/w1280"

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

const Movie = ({ setStarredMovies, title, poster_path, vote_average, isStarred, id}) => {
    const PostData = () => {
        console.log("HELLO")
        const user = JSON.parse(localStorage.getItem("user"))
        const url = "https://guarded-forest-32502.herokuapp.com/users/addMovie"
        const m_id = id
        const credentials = {
            id: user._id,
            title: title,
            poster_path: poster_path,
            vote_average: vote_average,
            movie_id: m_id
        }
        axios
        .post(url, credentials)
        .then((response) => {
            console.log('nice')
            const result = response.data;
            setStarredMovies(result)
            })
            .catch((error) => {
                console.log(error)
        });
    };
    return (
        <div className = "movie">
            <i className="material-icons" onClick = {() => PostData()}>{ isStarred ? "star" : "star_border" }</i>
            <img src={(poster_path ? (IMG_API + poster_path) : 'https://insmac.org/uploads/posts/2017-01/1483684776_movieicon.png')} alt = {title}/>
            <div className = "movie-info">
                <h3>{title}</h3>
                <span className = {`tag-${setVoteClass(vote_average)}`}>
                    {vote_average}
                </span>
                
            </div>
        </div>
    )
};

export default Movie