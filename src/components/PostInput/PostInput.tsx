import React, { FC, useEffect, useRef, useState } from 'react';
import axios from "axios";
import css from './PostInput.module.scss'
import cookies from "js-cookie";
import { Posts } from "../../pages/Home/Home";
import Avvvatars from "avvvatars-react";
import ModalPost from "../ModalPost/ModalPost";
import { useEditorJWT } from "../../utils/jwt.store";

type PostInputProps = {
  onPost: (newPost: Posts) => void
}

const PostInput: FC<PostInputProps> = ({ onPost }) => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [showModal, setShowModal] = useState<string>("")
  const jwtStore = useEditorJWT()
  const postText = useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const handleSendPost = (content: string) => {
    axios.post("http://localhost:3333/api/posts/createpost", {
      "id": cookies.get("id") ?? "",
      "content": content
    }).then(({ data }) => {
      const newPost: Posts = {
        id: cookies.get("id") ?? "",
        username: cookies.get('username') ?? "",
        created_at: data.post.created_at_post,
        content: content,
        like: "",
        post_id: data.post.post_id,
        admin: data.admin,
      }
      onPost(newPost)
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  useEffect(() => {
    document.body.style.overflow = 'unset'
  }, [document.body.style.overflow])
  
  return (
    <div className={css.containerPost}>
      
      {jwtStore.getJwtToken() ?
        <>
          {/*<div className={css.left}>*/}
          {/*  <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>*/}
          {/*</div>*/}
          {/*<div className={css.right}>*/}
          {/*  <label htmlFor="input"></label>*/}
          {/*  <input onClick={() => setShowModal('here')} className={css.input} autoComplete="off" autoFocus*/}
          {/*         placeholder="Write your story book" ref={postText} id="input"/>*/}
          {/*</div>*/}
          
          
        </>
        : (
          <span className={css.notConnected}>You need to be connected to post a story book</span>
        )}
      
      {/*{showModal && <ModalPost*/}
      {/*  addPost={(str: string) => {*/}
      {/*    handleSendPost(str)*/}
      {/*    setShowModal('')*/}
      {/*  }}*/}
      {/*  deleteModal={() => setShowModal('')}/>}*/}
    </div>
  );
};

export default PostInput;