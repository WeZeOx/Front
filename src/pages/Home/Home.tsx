import React, { FC, useEffect, useRef, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import cookies from "js-cookie";


type userData = {
  id: string,
  created_at: Date,
  username: string,
  email: string
}

type postData = {
  id: string
  created_at: Date,
  content: string
  like: string
  post_id: string
}

type posts = {
  post: postData
  user: userData
}

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [posts, setPosts] = useState<posts[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  
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
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get('jwt-token') ?? "",
      }
    }).then(({ data }) => {
      const post: posts = {
        post: data.post,
        user: {
          created_at: new Date(cookies.get("created-at") ?? ""),
          email: cookies.get("email") ?? "",
          username: cookies.get("username") ?? "",
          id: cookies.get("id") ?? ""
        }
      }
      setPosts((posts) => [...posts, post])
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  
  
  return (
    <>
      <Navbar/>
      {posts.map((post, idx) => (
        <div key={idx}>
          <div>{post.user.username}</div>
          <div>{post.post.content}</div>
        </div>
      )).reverse()}
      <span style={{color: "red"}}>{errorMessage}</span>
      <input ref={postText}/>
      <button onClick={handleSENDPOST}>ggggggggggg</button>
    </>
  );
};

export default Home;