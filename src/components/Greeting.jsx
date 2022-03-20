import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Paths} from '../enum'
import {Context} from '../services'

const Greeting = ({signUpHandler, signInHandler}) => {
  const {theme} = useContext(Context)
  return (
    <div className="greeting" style={{background:theme.main}}>
      <Link className="link" style={{color: theme.accent, borderColor: theme.accent}} to={Paths.SignUp} onClick={signUpHandler}>Sign up</Link>
      <Link className="link" style={{color:theme.accent, borderColor:theme.accent}} to={Paths.SignIn} onClick={signInHandler}>Sign in</Link>
    </div>
  )
}

export default Greeting