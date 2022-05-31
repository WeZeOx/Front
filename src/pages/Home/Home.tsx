import React, { FC, useEffect, useRef, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import cookies from "js-cookie";

type posts = {
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
      console.log(data, "data created")
      console.log(data.admin)
      const newPost: posts = {
        id: cookies.get("id") ?? "",
        username: cookies.get('username') ?? "",
        created_at_post: data.post.created_at_post,
        content: postText.current.value,
        like: "",
        post_id: data.post.post_id,
        admin: data.admin,
      }
      setPosts((posts) => [...posts, newPost])
      postText.current.value = ""
    }).catch((err) => setErrorMessage(err.response.data.message))
  }

  return (
    <>
      <Navbar/>
      
      {posts.map((post, idx) => (
        <div key={idx}>
          {post.admin ? <span style={{color: "red"}}>{post.username}</span> : <span>{post.username}</span>}
          <div>{post.content}</div>
        </div>
      )).reverse().slice(0, 12)}
      <span>{errorMessage}</span>
      <input ref={postText}/>
      <button onClick={handleSENDPOST}>Send Post</button>
    </>
  );
};

export default Home;