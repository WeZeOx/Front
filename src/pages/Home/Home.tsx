import React, { FC, useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import PostInput from "../../components/PostInput/PostInput";
import CardPost from "../../components/CardPost/CardPost";
import css from './Home.module.scss'
import { useEditorJWT } from "../../utils/jwt.store";

export type Posts = {
  user_id: string,
  created_at: string,
  username: string,
  content: string,
  like: string,
  post_id: string,
  categories: string,
  admin: boolean
}

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [posts, setPosts] = useState<Posts[]>([])
  const [userConnectedIsAdmin, setUserConnectedIsAdmin] = useState<boolean>(false)
  const [numberOfPost, setNumberOfPost] = useState<number>(12)
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const jwtStore = useEditorJWT()
  
  const removeItemInList = (post: Posts) => {
    const index = posts.indexOf(post)
    setPosts((prevState: Posts[]) => prevState.filter((state: Posts, idx: number) => idx !== index))
  }
  
  const addMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > (document?.scrollingElement?.scrollHeight ?? 0)) {
      setNumberOfPost((prevNumberOfPost) => prevNumberOfPost + 10)
    }
  }
  
  useEffect(() => {
    axios.get<Posts[]>("http://localhost:3333/api/posts/all")
      .then(({ data }) => setPosts(data.reverse()))
      .catch((err) => console.log(err))
    window.addEventListener('scroll', addMore)
    return () => window.removeEventListener('scroll', addMore)
  }, [])
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/isadmin/`)
      .then(({ data }) => setUserConnectedIsAdmin(data.isAdmin))
      .catch((err) => console.log(err))
  }, [jwtStore.token])
  
  return (
    <>
      <Navbar/>
      <PostInput
        onPost={(newPost: Posts) => setPosts((posts: Posts[]) => [newPost, ...posts])}
      />
      <div className={css.containerPost}>
        {posts
          .slice(0, numberOfPost)
          .map((post: Posts, idx: number) => (
            <CardPost
              indexCardPost={idx}
              idxModalToShow={idxModalToShow}
              setIdxModalToShow={setIdxModalToShow}
              userConnectedIsAdmin={userConnectedIsAdmin}
              post={post}
              onDeletePost={(post: Posts) => removeItemInList(post)}
              key={idx}
            />
          ))}
      </div>
    </>
  );
};

export default Home;