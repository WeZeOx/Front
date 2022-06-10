import React, { FC } from 'react';
import { Link } from "react-router-dom";
import css from "./Navbar.module.scss"
import SignoutButton from "../SignoutButton/SignoutButton";
import SigninAndUpButton from "../SignInAndUpButton/SignInAndUpButton"
import { useEditorJWT } from "../../hooks/jwt.store";

type Navbar = {}

const Navbar: FC<Navbar> = () => {
  const jwtStore = useEditorJWT()
  return (
    <div className={css.containerNavbar}>
      <Link to='/home' className={css.slogan}><span>Face2book |</span><span>Write your story book</span></Link>
      {jwtStore.token ? <SignoutButton/> : <SigninAndUpButton/>}
    </div>
  );
};

export default Navbar;