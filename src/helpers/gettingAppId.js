import {Navigate} from "react-router-dom";

export const withNavigateToUserPage = (Component) => {
    return (props) => sessionStorage.getItem('secret_token') ? <Navigate to='/' replace/> : <Component {...props}/>
}
