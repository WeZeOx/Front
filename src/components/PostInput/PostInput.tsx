import React, { FC, useRef, useState } from 'react';
import axios from "axios";
import css from './PostInput.module.scss'
import cookies from "js-cookie";
import { Posts } from "../../pages/Home/Home";
import Avvvatars from "avvvatars-react";

type PostInputProps = {
  onPost: (newPost: Posts) => void
}

const PostInput: FC<PostInputProps> = ({ onPost }) => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const postText = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const handleSendPost = () => {
    axios.post("http://localhost:3333/api/posts/createpost", {
      "id": cookies.get("id") ?? "",
      "content": postText.current.value
    }).then(({ data }) => {
      const newPost: Posts = {
        id: cookies.get("id") ?? "",
        username: cookies.get('username') ?? "",
        created_at_post: data.post.created_at_post,
        content: postText.current.value,
        like: "",
        post_id: data.post.post_id,
        admin: data.admin,
      }

      onPost(newPost)
      postText.current.value = ""
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  
  return (
    <div className={css.containerPost}>
      <div className={css.left}>
        <Avvvatars value={cookies.get('username') ?? ""} style="shape" />
      </div>
      
      <div className={css.right}>
        <label htmlFor="input"></label>
        <input className={css.input} autoComplete="off" autoFocus placeholder="Write your story book" ref={postText} id="input"/>
      </div>
    </div>
  );
};

export default PostInput;