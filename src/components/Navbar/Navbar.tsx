import React, { FC } from 'react';
import cookies from 'js-cookie';
import {Link} from "react-router-dom";
import css from "./Navbar.module.scss"
import SignoutButton from "../SignoutButton/SignoutButton";
import SigninAndUpButton from "../SignInAndUpButton/SignInAndUpButton"

type Navbar = {}

const Navbar: FC<Navbar> = () => {
  
  return (
    <div className={css.containerNavbar}>
      <Link to='/home' className={css.slogan}>Forumi Be Happy</Link>
      {cookies.get('jwt-token') ?  <SignoutButton /> : <SigninAndUpButton />}
    </div>
  );
};

export default Navbar;