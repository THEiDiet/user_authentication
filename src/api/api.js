import axios from "axios";
import {getAppId} from "../helpers/gettingAppId";

const instance = axios.create({
    baseURL: 'https://testtask.softorium.pro/',
    headers: {
        'X-APP-ID': getAppId()
    }
})

export const authUser = (data,callback) => {
    return instance.post('/signup', JSON.stringify(data),{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if(res.status === 200){
            callback(res)
        }
    }).catch((e)=>{

        alert(e.response.data.detail.map(el=> 'Errors: '+el.msg).join('\n'))
    })
}
export const signIn = (data) => {
    return instance.post('/signin', data)
        .then(res=>{
            if(res.status === 200){
                return res
            }
    }).catch((e)=>{
            alert(e.response.data.detail)
        })
}
export const me = async (token) => {
    return  await instance.get('/users/me',{
        headers:{
            'Authorization':token
        }
    })
}
