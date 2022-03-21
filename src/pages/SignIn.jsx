import React, {useContext} from 'react'
import {ErrorMessage, Formik} from 'formik'
import {validatePhoneAndPassword} from '../helpers/validationHelper'
import {Form, Input} from 'formik-antd'
import {Button} from 'antd'
import {userAPI} from '../api/api'
import {Navigate, useNavigate} from 'react-router-dom'
import {PhoneNumberField} from '../components'
import {Paths, StorageKey} from '../enum'
import {Context} from '../services'
import '../styles/CustomForm.css'

const SignIn = ({setUser}) => {
  const {theme, token} = useContext(Context)
  const styles = {color: theme.secondColor, borderColor: theme.accent}
  let navigate = useNavigate()
  const handleSignIn = async values => {
    let formData = new FormData()
    formData.append('username', values.username.split('').filter(el => /[+0-9]/.test(el)).join(''))
    formData.append('password', values.password)
    const response = await userAPI.signIn(formData)
    if (response && response.status === 200) {
      const access_token = response.data.access_token
      const token_type = response.data.token_type
      const secret_token = token_type[0].toUpperCase() + token_type.slice(1) + ' ' + access_token
      sessionStorage.setItem(StorageKey.SecretToken, secret_token)
      setUser(secret_token)
      navigate('/', {replace: true})
    }
  }
  return token ? (
    <Navigate to={Paths.Home}/>
  ) : (
    <div style={{background: theme.main}} className="login">
      <Formik
        initialValues={{password: '', username: ''}}
        validate={values => {
          const errors = {}
          return validatePhoneAndPassword(values, errors)
        }}
        onSubmit={(values, {setSubmitting}) => {
          handleSignIn(values)
          setSubmitting(false)
        }}
      >
        {({isSubmitting, values, setFieldValue, handleSubmit}) => (
          <Form className="formContainer formWrapper" style={{background: theme.second}}>
            <PhoneNumberField
              mask="+7 (999) 999-99-99"
              name="username" value={values.username}
              placeholder="Phone number"
              onChange={(e) => {
                const value = e.target.value || ''
                setFieldValue('username', value)
              }}
            />
            <Input type="password" className="antInput" style={styles} name="password"
                   placeholder="Password"/>
            <ErrorMessage name="password" component="div" className="error"/>
            <Button onClick={handleSubmit} name={'submit'} disabled={isSubmitting}
                    style={{
                      color: theme.accent,
                      borderColor: theme.accent,
                      background: theme.second
                    }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignIn