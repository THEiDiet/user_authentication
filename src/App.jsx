import React, {useEffect, useState} from 'react'
import {Context} from './services'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {Greeting, NotFound, User} from './components'
import {Paths, StorageKey} from './enum'
import './styles/App.css'
import {theme} from './services/theme'
import {SignIn, SignUp} from './pages'
import {userAPI} from './api/api'

const App = () => {
  const [user, setUser] = useState(null)
  const [currentTheme, setCurrentTheme] = useState(theme.light)
  const navigate = useNavigate()
  const token = sessionStorage.getItem(StorageKey.SecretToken) || null
  let ctxValue = {token: token, theme: currentTheme}

  if (!localStorage.getItem(StorageKey.UserId)) {
    localStorage.setItem(StorageKey.UserId, JSON.stringify(Math.random().toString()))
  }

  const changeTheme = () => {
    if (currentTheme && (currentTheme.accent === theme.light.accent)) {
      setCurrentTheme(theme.dark)
      localStorage.setItem(StorageKey.Theme, JSON.stringify(theme.dark))
    } else {
      setCurrentTheme(theme.light)
      localStorage.setItem(StorageKey.Theme, JSON.stringify(theme.light))
    }
  }
  const setUserData = async (secret_token) => {
    const res = await userAPI.me(secret_token)
    setUser(res.data)
    navigate(Paths.Home)
  }
  useEffect(() => {
    if (!token) {
      navigate(Paths.Auth)
    }
    if (token && !user) {
      setUserData(token)
    }
    const themeFromStorage = localStorage.getItem(StorageKey.Theme)
    if(themeFromStorage){
      setCurrentTheme(JSON.parse(themeFromStorage))
    } else {
      setCurrentTheme(theme.light)
      localStorage.setItem(StorageKey.Theme,JSON.stringify(theme.light))
    }
  }, [user])
  return (
    <Context.Provider value={ctxValue}>
      <div className="App">
        <Routes>
          <Route path={Paths.Home} element={<User user={user} changeTheme={changeTheme}/>}/>
          <Route path={Paths.SignUp} element={<SignUp setUser={setUserData} changeTheme={changeTheme}/>}/>
          <Route path={Paths.SignIn} element={<SignIn setUser={setUserData}/>}/>
          <Route path={Paths.Auth} element={<Greeting/>}/>
          <Route path={Paths.NotFound} element={<NotFound/>}/>
        </Routes>
      </div>
    </Context.Provider>

  )
}

export default App
