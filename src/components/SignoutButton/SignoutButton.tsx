import React, { FC } from 'react';
import css from "./SignOutButton.module.scss";
import cookies from "js-cookie";

type MyProps = {}

const SignoutButton: FC<MyProps> = () => {
  const user = cookies.get('username')
  
  const handleSignout = () => {
    cookies.remove("jwt-token")
    cookies.remove("username")
    cookies.remove("id")
    cookies.remove("email")
    cookies.remove("created-at")
    window.location.reload()
  }
  
  return (
    <div className={css.containerButton}>
      <ul className={css.containerList}>
        
        <li className={css.list}><span className={css.name}>Hello {user}</span></li>
        
        <li className={css.list}>
          <a type="submit" onClick={handleSignout} className={css.link}>Sign Out</a>
        </li>
      </ul>
    </div>
  );
};

export default SignoutButton;