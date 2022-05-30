import React, { FC, useEffect } from 'react';
import { Link } from "react-router-dom";
import css from "./SignInAndUpButton.module.scss"

type MyProps = {}

const SignInAndUpButton: FC<MyProps> = () => {

  return (
    <div className={css.containerButton}>
      <ul className={css.containerList}>
        <li className={css.list}>
          <Link className={css.link} to='/signin'>Sign In</Link>
        </li>
        
        <li className={css.list}>
          <Link className={css.link} to='/signup'>Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default SignInAndUpButton;