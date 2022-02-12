import React from 'react';
import InputMask from 'react-input-mask'
import {ErrorMessage, Formik} from 'formik';
import {validateFunc} from '../helpers/validationHelper'
import {Form, Input, Select} from 'formik-antd';
import {Button, DatePicker} from "antd";
import './../styles/Forms.css'
import 'antd/dist/antd.css';

export const CustomInput = (props) => (
    <InputMask  {...props}>{(inputProps) => (
        <Input {...inputProps} />
    )}</InputMask>
);

const Forms = ({callback}) => {

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
                } }
                validate={values => {
                    const errors = {}
                    return validateFunc(values,errors)
                }}
                onSubmit={(values, {setSubmitting}) => {
                        callback(values)
                        setSubmitting(false);
                }}

            >
                {({isSubmitting, setFieldValue,handleSubmit }) => (
                    <Form  className='formContainer'>
                        <CustomInput
                            mask="+7 (999) 999-99-99"
                            name="phone"
                            placeholder='Phone number'
                            onChange={(e) => {
                                const value = e.target.value || '';
                                setFieldValue('phone', value);
                            }}
                        />
                        <ErrorMessage name="phone" component="div"/>
                        <Input type="password"  placeholder='Password' name="password"/>
                        <ErrorMessage name="password" component="div" className='error'/>
                        <Input type="text"  placeholder='Name and last name' name="name"/>

                        <Input type="email"  placeholder='Email' name="email"/>
                        <ErrorMessage name="email" component="div"/>
                        <Select  name="time_zone" className='antInput'  placeholder='timezone'>
                            <Select.Option value="+00">Greenwich UTC+0</Select.Option>
                            <Select.Option value="+03">Moscow UTC+3</Select.Option>
                            <Select.Option value="+07">Krasnoyarsk UTC+7</Select.Option>
                        </Select>
                        <DatePicker  className='antInput' format='DD.MM.YYYY' name={'birthday'}  placeholder='b-day'
                                    onChange={(moment, dateString) => {
                                        setFieldValue('birthday', dateString);
                                    }}
                        />

                        <Button type={'primary'} onClick={handleSubmit} name={'submit'} disabled={isSubmitting}>
                            submit
                        </Button>
                    </Form>

                )}
            </Formik>
        </div>
    );
};

export default Forms
