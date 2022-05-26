import React, { FC } from 'react';
import Navbar from "../../components/Navbar/Navbar";

type Home = {}

const Home: FC<Home> = () => {
  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default Home;