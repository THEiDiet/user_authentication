import React, {useContext} from 'react'
import {ErrorMessage, Formik} from 'formik'
import {validateFunc} from '../helpers/validationHelper'
import {Form, Input, Select} from 'formik-antd'
import {Button, DatePicker} from 'antd'
import '../styles/CustomForm.css'
import {PhoneNumberField} from './index'
import {Context} from '../services'

const CustomForm = ({callback, changeTheme}) => {
  const {theme} = useContext(Context)
  const styles = {color: theme.secondColor, borderColor: theme.accent}
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          phone: '',
          birthday: '',
          name: '',
          time_zone: ''
        }}
        validate={values => {
          const errors = {}
          return validateFunc(values, errors)
        }}
        onSubmit={(values, {setSubmitting}) => {
          callback(values)
          setSubmitting(false)
        }}
      >
        {({isSubmitting, setFieldValue, handleSubmit}) => (
          <Form className="formContainer">
            <PhoneNumberField
              mask="+7 (999) 999-99-99"
              name="phone"
              placeholder="Phone number"
              onChange={(e) => {
                const value = e.target.value || ''
                setFieldValue('phone', value)
              }}
            />
            <ErrorMessage name="phone" component="div"/>

            <Input type="password" placeholder="Password" name="password" className="antInput" style={styles}/>

            <ErrorMessage name="password" component="div" className="error"/>
            <Input type="text" placeholder="Name and last name" name="name" className="antInput" style={styles}/>

            <Input type="email" placeholder="Email" name="email" className="antInput" style={styles}/>
            <ErrorMessage name="email" component="div" className="error"/>

            <Select name="time_zone" placeholder="timezone" className="antInput" style={styles}>
              <Select.Option value="+00">Greenwich UTC+0</Select.Option>
              <Select.Option value="+03">Moscow UTC+3</Select.Option>
              <Select.Option value="+07">Krasnoyarsk UTC+7</Select.Option>
            </Select>

            <DatePicker className="antInput" format="DD.MM.YYYY" name={'birthday'} placeholder="b-day"
                        onChange={(moment, dateString) => {
                          setFieldValue('birthday', dateString)
                        }}
            />
            <Button type={'primary'} onClick={handleSubmit} name={'submit'} disabled={isSubmitting}
                    style={{color: theme.accent, borderColor: theme.accent, background: theme.second}}>
              Submit
            </Button>
            <Button onClick={changeTheme}
                    style={{color: theme.accent, borderColor: theme.accent, background: theme.second, marginTop: 10}}>Change
              theme</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CustomForm
