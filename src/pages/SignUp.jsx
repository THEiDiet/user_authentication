import {useContext, useEffect, useState} from 'react'
import {CustomForm, UploadImage} from '../components'
import {userAPI} from '../api/api'
import {StorageKey} from '../enum'
import {Context} from '../services'
import '../styles/App.css'
import '../styles/CustomForm.css'

const SignUp = ({setUser, changeTheme}) => {
  const [base64, setBase64] = useState()
  const ctx = useContext(Context)
  const handleRegisterUser = (data) => {
    const refactoredData = {
      ...data,
      phone: data.phone.split('').filter(el => /[+0-9]/.test(el)).join(''),
      birthday: data.birthday.split('.').reverse().join('-')
    }
    userAPI.authUser({...refactoredData, avatar_img: base64}, (res) => fetchResAndSignIn(res, refactoredData))
  }
  const fetchResAndSignIn = async (res, userData) => {
    if (res.status === 200) {
      let values = res.data
      let formData = new FormData()
      formData.append('username', values.phone)
      formData.append('password', userData.password)
      const resp = await userAPI.signIn(formData)
      if (resp.status === 200) {
        const access_token = resp.data.access_token
        const token_type = resp.data.token_type
        const secret_token = token_type[0].toUpperCase() + token_type.slice(1) + ' ' + access_token
        sessionStorage.setItem(StorageKey.SecretToken, secret_token)
        setUser(secret_token)
      }
    } else {
      console.log(res)
    }
  }
  useEffect(() => {
    setBase64(base64)
  }, [base64])
  return (
    <div className="signUp" style={{background: ctx.theme.main}}>
      <div className="formWrapper" style={{background: ctx.theme.second}}>
        <UploadImage setImage={setBase64}/>
        <CustomForm callback={handleRegisterUser} changeTheme={changeTheme}/>
      </div>
    </div>
  )
}

export default SignUp
