import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import css from "./Signup.module.scss"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import { useEditorJWT } from "../../hooks/jwt.store";

type stateResponse = {
  message: string,
  auth: boolean,
  token: string
}

type userResponse = {
  id: string,
  created_at: Date,
  username: string
}

type registerResponse = {
  state: stateResponse
  user: userResponse
  
}

type MyProps = {}

const Signup: FC<MyProps> = () => {
  const navigate = useNavigate()
  const useEditor = useEditorJWT()
  const [errorMessage, setErrorMessage] = useState("")
  
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;
  const verifyPassword = useRef() as React.MutableRefObject<HTMLInputElement>;
  const username = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  useEffect(() => {
    if (useEditor.token !== '') return navigate('/home')
  }, []);
  
  const handleSuccessfulRegister = (response: registerResponse) => {
      if (!response.state.auth || response.state.message !== "Authorized") return
    cookies.set("jwt-token", response.state.token, { expires: 3 })
    cookies.set("username", response.user.username, { expires: 3 })
    cookies.set("id", response.user.id, { expires: 3 })
    cookies.set("created-at", response.user.created_at.toString(), { expires: 3 })
    useEditor.setJwtToken(response.state.token ?? "")
    navigate("/home")
  }
  
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post("http://localhost:3333/api/users/signup/", {
      "username": username.current.value,
      "password": password.current.value,
      "verify_password": verifyPassword.current.value,
      "email": email.current.value
    }).then(({ data }) => handleSuccessfulRegister(data))
      .catch((err) => setErrorMessage(err.response.data.message))
  }
  
  return (
    <>
      <div className={css.containerSignUp}>
        <div className={css.backForm}>
          <span className={css.title}>Register</span>
          <form className={css.middleForm} onSubmit={(e: FormEvent<HTMLFormElement>) => handleRegister(e)}>
            <div className={css.two}>
              <div className={css.parentInput}>
                <label className={css.label} htmlFor="email">Email</label>
                <input className={css.input} autoComplete="off" autoFocus type="email" id="email" required ref={email}/>
              </div>
              <div className={css.parentInput}>
                <label className={css.label} htmlFor="password">Password </label>
                <input className={css.input} type="password" id="password" required ref={password}/>
              </div>
            </div>
            <div className={css.two}>
              <div className={css.parentInput}>
                <label className={css.label} htmlFor="username">Username</label>
                <input className={css.input} type="text" id="username" required ref={username}/>
              </div>
              <div className={css.parentInput}>
                <label className={css.label} htmlFor="verifyPassword">Verify Password</label>
                <input className={css.input} type="password" id="verifyPassword" required ref={verifyPassword}/>
              </div>
            </div>
            <div className={css.parentSubmit}>
              <div className={css.container}>
                <span className={css.error}>{errorMessage}</span>
                <input className={css.submit} type="submit" value="Register"/>
                <span className={css.info}>
                  <div>Your already have an account ?<Link to='/signin'>Sign in</Link></div>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;