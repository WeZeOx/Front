import React, { FC } from 'react';
import { Link } from "react-router-dom";
import css from "./Navbar.module.scss"
import SignoutButton from "../SignoutButton/SignoutButton";
import SigninAndUpButton from "../SignInAndUpButton/SignInAndUpButton"
import { useEditorJWT } from "../../utils/jwt.store";

type Navbar = {}

const Navbar: FC<Navbar> = () => {
  const useEditor = useEditorJWT()
  return (
    <div className={css.containerNavbar}>
      <Link to='/home' className={css.slogan}>Forumi Be Happy</Link>
      {useEditor.getJwtToken() ? <SignoutButton/> : <SigninAndUpButton/>}
    </div>
  );
};

export default Navbar;