import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/authContext";
import Input from "../UI/Input/Input";

const emailReducer = (state, action)=>{
    switch (action.type){
        case 'Input_Email':
            return {
                value: action.value,
                isValid: action.value.includes('@')
            }
        case 'Email_Invalid':
            return {
                value: state.value,
                isValid: state.value.includes('@')
            }
        default:
            return {
                value: '',
                isValid: null
            }
    }
}
const passwordReducer = (state, action)=>{
    switch (action.type){
        case 'Input_Password':
            return {
                value: action.value,
                isValid: action.value.trim().length > 6
            }
        case 'Password_Invalid':
            return {
                value: state.value,
                isValid: state.value.trim().length > 6
            }
        default:
            return {
                value: '',
                isValid: null
            }
    }
}

const Login = (props) => {
    const authCtx = useContext(AuthContext)
    const emailInitState = { value: '', isValid: null }
    const [emailState, dispatchEmail] = useReducer(emailReducer, emailInitState)

    const passwordInitState = { value: '', isValid: null }
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, passwordInitState)

    const [formState, setFormState] = useState(false);

    const { isValid: emailIsValid } = emailState
    const { isValid: passwordValid } = passwordState //object destructuring

    useEffect(() =>{
        const identifier = setTimeout(()=>{
            setFormState(emailIsValid && passwordValid)
        }, 100);

        return () => clearTimeout(identifier)

    }, [emailIsValid,passwordValid])


    const emailChangeHandler = (event) => dispatchEmail({ type: 'Input_Email', value: event.target.value })
    const validateEmailHandler = () => dispatchEmail({ type: 'Email_Invalid' })

    const passwordChangeHandler = (event) => dispatchPassword({ type: 'Input_Password', value: event.target.value })
    const validatePasswordHandler = () => dispatchPassword({ type: 'Password_Invalid' })

    const submitHandler = (event) => {
        event.preventDefault();
        authCtx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    value={emailState.value}
                    isValid={emailState.isValid}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    id="password"
                    type="password"
                    label="Password"
                    value={passwordState.value}
                    isValid={passwordState.isValid}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formState}> Login </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
