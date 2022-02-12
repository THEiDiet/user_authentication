import {Navigate} from "react-router-dom";

export function getAppId  () {
    return JSON.parse(localStorage.getItem('user_id'))
}
export const withNavigateToUserPage = (Component) => {
    return (props) => sessionStorage.getItem('secret_token') ? <Navigate to='/' replace/> : <Component {...props}/>
}
