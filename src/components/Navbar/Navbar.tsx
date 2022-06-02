import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import css from "./Navbar.module.scss"
import SignoutButton from "../SignoutButton/SignoutButton";
import SigninAndUpButton from "../SignInAndUpButton/SignInAndUpButton"
import { useEditorJWT } from "../../utils/jwt.store";
import axios from "axios";
import cookies from "js-cookie";

type Navbar = {}

const Navbar: FC<Navbar> = () => {
  const jwtStore = useEditorJWT()
  return (
    <div className={css.containerNavbar}>
      <Link to='/home' className={css.slogan}><span>Face2book |</span><span>Write your story book</span></Link>
      {jwtStore.getJwtToken() ? <SignoutButton/> : <SigninAndUpButton/>}
    </div>
  );
};

export default Navbar;