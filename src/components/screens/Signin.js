import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { userContext } from '../../App';
import axios from 'axios';
import M from 'materialize-css'

const Signin = () => {
    const {dispatch} = useContext(userContext)
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {
        const url = "https://guarded-forest-32502.herokuapp.com/users/signin"
        const credentials = {
            username: username,
            password: password
        }
        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            if (result.error) {
                M.toast({html: result.error})
            } else {
                localStorage.setItem("jwt", result.token)
                localStorage.setItem("user",JSON.stringify(result.user))
                dispatch({type:"USER", payload: result.user})
                M.toast({html: result.message})
                history.push('/')
            }
            })
            .catch((error) => {
                console.log(error)
        });
    };
    return (
        <div className = "mycard"> 
            <div className ="card auth-card input-field">
                <h2>Sign in</h2>
                <input
                type = "text"
                placeholder = "username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                type = "password"
                placeholder = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #00e5ff cyan accent-3"
                onClick = {() => PostData()}>
                    <i className="material-icons">forward</i>
                </button>

            </div>
 
        </div>
    )
}

export default Signin