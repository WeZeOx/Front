import React, { FC, useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import PostInput from "../../components/PostInput/PostInput";
import CardPost from "../../components/CardPost/CardPost";
import css from './Home.module.scss'

export type Posts = {
  id: string
  created_at_post: Date,
  username: string,
  content: string,
  like: string,
  post_id: string
  admin: boolean
}


type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [posts, setPosts] = useState<Posts[]>([])
  useEffect(() => {
    axios.get("http://localhost:3333/api/posts/all")
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <Navbar/>
      <PostInput
        onPost={(newPost: Posts) => setPosts((posts) => [...posts, newPost])}
      />
      <div className={css.containerPost}>
        {posts
          .slice(-12)
          .map((post, idx) => (
            <CardPost
              post={post}
              key={idx}
            />
          )).reverse()}
      </div>
    </>
  );
};

export default Home;