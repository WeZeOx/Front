import React, { FC } from 'react';
import css from "./SignOutButton.module.scss";
import { Link } from "react-router-dom";

type MyProps = {}

const SignoutButton:FC<MyProps> = () => {
  const user = "Anthony"
  
  return (
    <div className={css.containerButton}>
      <ul className={css.containerList}>
      
        <li className={css.list}><span className={css.name}>Hello {user}</span></li>
        
        
        <li className={css.list}>
          <Link className={css.link} to='/signin'>Sign Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default SignoutButton;