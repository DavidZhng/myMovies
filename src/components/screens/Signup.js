import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const PostData = () => {
        const url = "https://guarded-forest-32502.herokuapp.com/users/signup"
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
                M.toast({html: result.message})
                history.push('/home')
            }
            })
            .catch((error) => {
                console.log(error)
        });
    };
    return (
        <div className = "mycard"> 
            <div className ="card auth-card input-field">
                <h2>Sign up</h2>
                <input
                type = "text"
                placeholder = "username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                type = "password"
                placeholder = "password"
                hidePassword={true}
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #00e5ff cyan accent-3" onClick = {() => PostData()}>
                    <i className="material-icons">forward</i>
                </button>
                <h6>
                    <Link to="/signin">Already have an account? Sign in</Link>
                </h6>

            </div>
 
        </div>
    )
}

export default Signup