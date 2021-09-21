import React, {useEffect, createContext, useReducer, useContext, useState} from 'react'
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import {reducer, initialState} from './reducers/userReducer'

export const userContext = createContext()

const Routing = ({setMovies, movies}) => {
  //const history = useHistory()
  const {dispatch} = useContext(userContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch({type:"USER", payload:user})
    // if (user) {
    //   console.log(user)
    //   history.push('/')
    // } else {
    //   history.push('/signin')
    // }
  }, [dispatch])
  return (
    <Switch>
      <Route exact path = "/">
        <Home setMovies = {setMovies} movies = {movies}/>
      </Route>
      <Route path = "/signin">
        <Signin />
      </Route>
      <Route path = "/profile">
        <Profile />
      </Route>
      <Route path = "/signup">
        <Signup />
      </Route>
    </Switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [movies, setMovies] = useState([])

  return (
    <userContext.Provider value = {{state, dispatch}}>
      <BrowserRouter>
      <NavBar setMovies = {setMovies}/>
      <Routing  setMovies = {setMovies} movies = {movies}/>
    </BrowserRouter>
    </userContext.Provider>
    
  );
}

export default App;