import React, {useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { userContext } from '../App'
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=d6e80186a2e93e81f8437d28f4ce76cb&query="

const NavBar = ({setMovies}) => {
    const {state, dispatch} = useContext(userContext)
    const [searchTerm, setSearchTerm] = useState('')

    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <div>
                    <li><Link to="/profile"><i className="material-icons">movie</i></Link></li>
                    <li>
                        <button className="btn"
                            onClick = {() => {
                                localStorage.clear()
                                dispatch({type:"CLEAR"})
                                history.push('/signin')
                            }}>
                        Logout
                        </button>
                    </li>
                </div>
            ]
        } else {
            return [
                <li><Link to="/signup">Sign up</Link></li>
            ]
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            fetch(SEARCH_API + searchTerm)
            .then((res) => res.json())
            .then((data) => {
              setMovies(data.results)
            })
            
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }
    return (
        <nav>
            <div className="nav-wrapper white #00e5ff cyan accent-3" >
                <Link to= {state ? "/" : "/signin"} className="brand-logo left">myMovies</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
                </ul>
                <form className = "search" onSubmit = {handleOnSubmit}>
                    <div className="input-field">
                    <input id="search" type="search" required value = {searchTerm} onChange = {handleOnChange}/>
                    <label className="label-icon" for="search"><i class="material-icons black-text">search</i></label>
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default NavBar;