import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import css from "./Sign.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import cookies from "js-cookie";

type loginResponse = {
  id: string,
  username: string
  CreatedAt: Date,
  email: string
  Message: string,
  Auth: boolean,
  Token: string
}

const Signin: FC<loginResponse> = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
    if (cookies.get('jwt-token') !== undefined) return navigate('/home')
  },[]);
  
  const [errorMessage, setErrorMessage] = useState("")
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const handleSucessFullLogin = (response: loginResponse) => {
    if (!response.Auth || response.Message !== "Authenticated") return
    cookies.set("jwt-token", response.Token, { expires: 3 })
    cookies.set("username", response.username, { expires: 3 })
    cookies.set("id", response.id, { expires: 3 })
    cookies.set("email", response.email, { expires: 3 })
    cookies.set("created-at", response.email, { expires: 3 })
    navigate("/home")
  }
  
  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post("http://localhost:3333/api/users/signin/", {
      "email": email.current.value,
      "password": password.current.value
    }).then(response => handleSucessFullLogin(response.data))
      .catch((err) => setErrorMessage(err.response.data.Message))
  }
  
  return (
    <>
      <Navbar/>
      <div className={css.containerSignIn}>
        <div className={css.backForm}>
          <span className={css.title}>Login</span>
          <form className={css.middleForm} onSubmit={(event: FormEvent<HTMLFormElement>) => handleSignin(event)}>
            <div className={css.parentInput}>
              <label className={css.label} htmlFor="email">Email</label>
              <input className={css.input} autoComplete="off" autoFocus type="email" id="email" required ref={email}/>
            </div>
            <div className={css.parentInput}>
              <label className={css.label} htmlFor="password">Password </label>
              <input className={css.input} type="password" id="password" required ref={password}/>
            </div>
            <div className={css.parentInput}>
              <span className={css.error}>{errorMessage}</span>
              <input className={css.submit} type="submit" value="Login"/>
              <span className={css.info}>Don't have an account ?<Link to='/signup'>Sign up</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;