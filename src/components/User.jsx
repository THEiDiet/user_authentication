import React, {useContext, useEffect, useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {Button} from 'antd'
import {Context} from '../services'
import {Paths, StorageKey} from '../enum'
import '../styles/User.css'
import {getZodiac} from '../utils'

export const User = ({user, changeTheme}) => {
  const {theme} = useContext(Context)
  const [zodiac, setZodiac] = useState('')
  const navigate = useNavigate()
  const {accent, color, secondColor, main, second} = theme

  const logOutHandler = () => {
    sessionStorage.removeItem(StorageKey.SecretToken)
    navigate(Paths.Auth, {replace: true})
  }
  useEffect(() => {
    setZodiac(getZodiac(user.birthday))
  }, [user])
  return !user
    ? <Navigate to={Paths.Auth}/>
    : <div className="container" style={{background: main}}>
      <div className="user__container">
        <div className="user" style={{background: second}}>
          <img className="user__img" src={user.avatar} alt=""/>
          <div className="user__name" style={{color: theme.color}}>{user.name || 'Unnamed'}<span
            className={`${user.enabled ? 'user__enabled' : 'user__disabled'}`}/></div>
          <div className="user__phone"><span style={{color: color}}>Phone: </span><span
            style={{color: secondColor}}>{user.phone}</span></div>
          <div className="user__email"><span style={{color: color}}>Email: </span><span
            style={{color: secondColor}}>{user.email}</span></div>
          <div className="user__b-day"><span style={{color: color}}>Your b-day: </span><span
            style={{color: secondColor}}>{user.birthday.split('-').join('.')}</span></div>
          <div className="user__b-day"><span style={{color: color}}>Your zodiac: </span><span
            style={{color: secondColor}}>{zodiac}</span></div>
          <Button onClick={changeTheme}
                  style={{color: accent, background: second, borderColor: accent, marginTop: 15}}>change theme</Button>
        </div>
        <div className="user__page">
          <div>
            <Button onClick={logOutHandler} style={{color: accent, background: main, borderColor: accent}}>Log
              out</Button>
          </div>
          <div>Hello my future friend (｀・ω・´)/</div>
        </div>
      </div>
    </div>
}