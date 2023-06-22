import React, { FC, FormEvent, useEffect, useRef, useState, MutableRefObject } from 'react';
import css from "./Sign.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { useEditorJWT } from "../../hooks/jwt.store";
import { baseUrl } from "../../environment/env";

type LoginResponse = {
  state: {
    message: string,
    auth: boolean,
    token: string
  },
  user: {
    id: string,
    created_at: Date,
    username: string
  },
}

type SigninProps = {}

const Signin: FC<SigninProps> = () => {
  const navigate = useNavigate();
  const jwtStore = useEditorJWT()
  
  const [errorMessage, setErrorMessage] = useState("")
  const email = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;
  
  useEffect(() => {
    if (jwtStore.token !== '') return navigate('/home')
  }, []);
  
  const handleSuccessfulLogin = (response: LoginResponse) => {
    if (!response.state.auth || response.state.message !== "Authorized") return
    cookies.set("username", response.user.username, { expires: 3 })
    cookies.set("id", response.user.id, { expires: 3 })
    cookies.set("created-at", response.user.created_at.toString(), { expires: 3 })
    jwtStore.setJwtToken(response.state.token ?? "")
    navigate("/home")
  }
  
  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post<LoginResponse>(`${baseUrl}/users/signin/`, {
      "email": email.current.value,
      "password": password.current.value
    }).then(({ data }) => handleSuccessfulLogin(data))
      .catch((err) => setErrorMessage(err.response.data.message))
  }

  // useEffect(() => {
  //   console.log(errorMessage)
  // }, [errorMessage])
  
  return (
    <>
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