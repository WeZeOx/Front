import React, { FC, useEffect, useState } from 'react';
import css from "./SignOutButton.module.scss";
import cookies from "js-cookie";
import admin from '/red.png'
import { useEditorJWT } from "../../utils/jwt.store";
import axios from "axios";

type MyProps = {}

const SignoutButton: FC<MyProps> = () => {
  const user = cookies.get('username')
  const id = cookies.get('id')
  const jwtStore = useEditorJWT()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/${id}`)
      .then(({ data }) => setIsAdmin(data.admin))
  }, [])
  

  const handleSignout = () => {
    cookies.remove("jwt-token")
    cookies.remove("username")
    cookies.remove("id")
    cookies.remove("email")
    cookies.remove("created-at")
    jwtStore.removeJwtToken()
  }
  
  return (
    <div className={css.containerButton}>
      <ul className={css.containerList}>
        
        <li className={css.list}><span className={css.name}>Hello {user}</span></li>
        
        <li className={css.list}>
          <h1 onClick={handleSignout} className={css.link}>Sign Out</h1>
        </li>
      </ul>
    </div>
  );
};

export default SignoutButton;