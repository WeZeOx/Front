import React, { FC } from 'react';
import css from "./SignOutButton.module.scss";
import cookies from "js-cookie";
import { useEditorJWT } from "../../utils/jwt.store";

type MyProps = {}

const SignoutButton: FC<MyProps> = () => {
  const user = cookies.get('username')
  const useEditor = useEditorJWT()
  
  const handleSignout = () => {
    cookies.remove("jwt-token")
    cookies.remove("username")
    cookies.remove("id")
    cookies.remove("email")
    cookies.remove("created-at")
    useEditor.removeJwtToken()
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