import './styles/App.css';
import Greeting from "./components/Greeting";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import User from "./components/User";

const Auth = () => {
    return sessionStorage.getItem('secret_token')
        ? <User/>
        : <Navigate to='/auth' replace/>
}

const EntryPoint = () => {

    if (localStorage.getItem('user_id') === null) {
        localStorage.setItem('user_id', JSON.stringify(Math.random().toString()))
    }

    return (
        <HashRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Auth/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/signin' element={<SignIn />}/>
                    <Route path='/auth' element={<Greeting/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default EntryPoint;
