import React from 'react'
import {ErrorMessage, Formik} from 'formik'
import {validatePhoneAndPassword} from '../helpers/validationHelper'
import {Form, Input} from 'formik-antd'
import {Button} from 'antd'
import {userAPI} from '../api/api'
import {useNavigate} from 'react-router-dom'
import '../styles/CustomForm.css'
import {PhoneNumberField} from '../components'
import {StorageKey} from '../enum'

const SignIn = () => {
  let navigate = useNavigate()
  const handleSignIn = async values => {
    let formData = new FormData()
    formData.append('username', values.username)
    formData.append('password', values.password)

    const response = await userAPI.signIn(formData)
    if (response && response.status === 200) {
      const access_token = response.data.access_token
      const token_type = response.data.token_type
      const secret_token = token_type[0].toUpperCase() + token_type.slice(1) + ' ' + access_token
      sessionStorage.setItem(StorageKey.SecretToken, secret_token)
      navigate('/', {replace: true})
    }
  }
  return (
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
        <Form className="formContainer formWrapper">
          <PhoneNumberField
            mask="+7 (999) 999-99-99"
            name="username" value={values.username}
            placeholder="Phone number"
            onChange={(e) => {
              const value = e.target.value || ''
              setFieldValue('username', value)
            }}
          />
          <Input type="password" name="password" placeholder="Password"/>
          <ErrorMessage name="password" component="div" className="error"/>
          <Button onClick={handleSubmit} name={'submit'} disabled={isSubmitting}>
            submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignIn