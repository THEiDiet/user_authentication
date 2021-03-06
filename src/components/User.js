import React, {useEffect, useState} from 'react';
import {me} from "../api/api";
import './../styles/User.css'
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const User = () => {
    const token = sessionStorage.getItem('secret_token')
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        me(token).then(res => setUser(res.data))
    }, [])
    const logOutHandler = () =>{
        sessionStorage.removeItem('secret_token')
        navigate('/auth',{replace:true})
    }
    return user
        ? <div className='user__container'>
            <div className='user'>
                <img className='user__img' src={user.avatar} alt=""/>
                <div className='user__name'>{user.name || 'Unnamed'}<span className={`${user.enabled ? 'user__enabled' : 'user__disabled'}`}/></div>
                <div className='user__phone'><span>Phone: </span><span>{user.phone}</span></div>
                <div className='user__email'><span>Email: </span><span>{user.email}</span></div>
                <div className='user__b-day'><span>Your b-day: </span><span>{user.birthday.split('-').join('.')}</span></div>
            </div>
            <div className='user__page'>
                <div>
                    <Button onClick={logOutHandler}>Log out</Button>
                </div>
                <div>Hello my future friend 	(｀・ω・´)/</div>
            </div>
        </div>
        : <div>no user</div>
};

export default User;