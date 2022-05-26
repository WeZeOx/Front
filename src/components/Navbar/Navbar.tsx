import React, { FC } from 'react';
import cookies from 'js-cookie';
import css from "./Navbar.module.scss"
import SignoutButton from "../SignoutButton/SignoutButton";
import SigninAndUpButton from "../SignInAndUpButton/SignInAndUpButton"

type Navbar = {}

const Navbar: FC<Navbar> = () => {
  
  return (
    <div className={css.containerNavbar}>
      <span className={css.slogan}>Forumi Be Happy</span>
      {cookies.get('jwt-token') ?  <SignoutButton /> : <SigninAndUpButton />}
    </div>
  );
};

export default Navbar;