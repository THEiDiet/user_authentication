import './styles/App.css';
import './styles/Forms.css';
import {useEffect, useState} from "react";
import Forms from "./components/Forms";
import {authUser, signIn} from "./api/api";
import {useNavigate} from "react-router-dom";
import UploadImage from "./components/UploadImage";
import {withNavigateToUserPage} from "./helpers/gettingAppId";

function SignUp() {
    let navigate = useNavigate()
    const [base64, setBase64] = useState()

    const requestAuthData = (data) => {
        const refactoredData = {
            ...data,
            phone: data.phone.split('').filter(el => /[+0-9]/.test(el)).join(''),
            birthday: data.birthday.split('.').reverse().join('-')
        }
        authUser({...refactoredData, avatar_img: base64}, (res) => fetchResAndSignIn(res, refactoredData))
    }
    const fetchResAndSignIn = async (res, userData) => {
        if (res.status === 200) {
            let values = res.data
            let formData = new FormData()
            formData.append('username', values.phone)
            formData.append('password', userData.password)
            const resp = await signIn(formData)
            if (resp.status === 200) {
                const access_token = resp.data.access_token
                const token_type = resp.data.token_type
                const secret_token = token_type[0].toUpperCase() + token_type.slice(1) + ' ' + access_token
                sessionStorage.setItem('secret_token', secret_token)
                navigate('/', {replace: true})
            }
        }else{
            console.log(res)
        }
    }

    useEffect(() => {
        setBase64(base64)
    }, [base64])
    return (
        <>
            <div className='formWrapper'>
                <UploadImage setImage={setBase64}/>
                <Forms callback={requestAuthData}/>
            </div>
        </>
    );
}

export default withNavigateToUserPage(SignUp);
