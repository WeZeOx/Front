import React, { FC, useEffect, useRef, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import cookies from "js-cookie";

type posts = {
  username: string,
  created_at: Date,
  content: string,
  email: string,
  like: string,
  dislike: string,
  post_id: string
}

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [posts, setPosts] = useState<posts[]>([])
  const [errorMessage, setErrorMessage] = useState<string>("")
  
  useEffect(() => {
    axios.get("http://localhost:3333/api/posts/all")
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err))
  }, [])
  
  const postText = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const handleSENDPOST = () => {
    axios.post("http://localhost:3333/api/posts/createpost", {
      "id": cookies.get("id") ?? "",
      "content": postText.current.value
    }).then(({ data }) => {
      const newPost: posts = {
        username: cookies.get('username') ?? "",
        created_at: data.created_at,
        content: postText.current.value,
        email: cookies.get('email') ?? "",
        like: "",
        dislike: "",
        post_id: data.post_id
      }
      setPosts((posts) => [...posts, newPost])
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  
  return (
    <>
      <Navbar/>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div>{post.username}</div>
          <div>{post.content}</div>
        </div>
      )).reverse()}
      <span>{errorMessage}</span>
      <input ref={postText}/>
      <button onClick={handleSENDPOST}>ggggggggggg</button>
    </>
  );
};

export default Home;