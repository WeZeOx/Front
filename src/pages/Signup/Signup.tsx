import React, { FC } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import css from "./Signup.module.scss"

type MyProps = {}

const Signup: FC<MyProps> = () => {
  
  const handleRegister = () => {
  }
  
  return (
    <>
      <Navbar/>
      <div className={css.containerSignUp}>
        SignUp
      </div>
    </>
  );
};

export default Signup;