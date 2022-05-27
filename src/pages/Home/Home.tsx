import React, { FC, useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

type postData = {
  content: string
  username: string
}

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [posts, setPosts] = useState<postData[]>([])
  
  useEffect(() => {
    axios.get("http://localhost:3333/api/posts/all")
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <Navbar/>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div>{post.username}</div>
          <div>{post.content}</div>
        </div>
      )).reverse()}
    </>
  );
};

export default Home;