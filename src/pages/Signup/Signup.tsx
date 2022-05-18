import React, { useEffect, useState } from 'react';
import axios from "axios";

type sendApi = {
  id: string,
  title: string,
  artist: string,
  price: number
}

const Signup = () => {
  const [data, setData] = useState<sendApi[]>([])
  useEffect(() => {
    axios.get('http://localhost:3333/api')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <div>
      {data.map((item) => {
        return <div>{item.price}</div>
      })}
      SignUp
    </div>
  );
};

export default Signup;