import { useState } from "react";
import { useForm } from "react-hook-form"
import jwt_decode from "jwt-decode";

import { Input, Message, BackToHome } from "../../components";

import { authentication } from "../../api/services/Auth";

import styles from './styles/styles.module.scss'

export default function Login() {
    const [msgs, setMsgs] = useState();
    const [loader, setLoader] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = (data) => {
        setLoader(true)
        authentication(data).then((response) => {
            const { auth, token, msgs } = response.data
            
            if (auth) {
                var decoded = jwt_decode(token);
                localStorage.setItem("authToken", token)
                localStorage.setItem("userInfo", JSON.stringify(decoded))
                setTimeout(() => {
                    window.location = '/'
                }, 3000)
            }

            setLoader(false)
            setMsgs(msgs)
        }).catch((err) => {
            setMsgs([{text: err.message, type: 'error'}])
        })
    }

    return (
        <div className={styles.container}>
            <Message msgs={msgs}/>
            {loader && 'carregando...'}
            <BackToHome />
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    id="username"
                    label={'Username'} 
                    register={register}
                    error={errors.username?.message}
                />
                <Input 
                    id={'password'} 
                    label={'Password'} 
                    register={register}
                    type={'password'}
                    error={errors.password?.message}
                />

                <input type="submit" value={'Login'} />
            </form>
        </div>
    )
}