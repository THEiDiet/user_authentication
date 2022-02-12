import React from 'react';
import {Link} from "react-router-dom";
import {withNavigateToUserPage} from "../helpers/gettingAppId";

const Greeting = ({signUpHandler,signInHandler}) => {
    return (
        <div className='greeting'>
            <Link className='link' to='/signup' onClick={signUpHandler}>Sign up</Link>
            <Link className='link' to='/signin' onClick={signInHandler}>Sign in</Link>
        </div>
    );
};

export default withNavigateToUserPage(Greeting);