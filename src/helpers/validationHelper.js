export const validatePhoneAndPassword = (values,errors)=> {
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6){
        errors.password = 'Password should be longer than 6 symbols';
    }

    return errors;
}

export const validateFunc = (values,errors)=>{
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    validatePhoneAndPassword(values,errors)
    return errors;
}
