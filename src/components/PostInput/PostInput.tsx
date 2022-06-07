import React, { FC, useState } from 'react';
import axios from "axios";
import css from './PostInput.module.scss'
import cookies from "js-cookie";
import { Posts } from "../../pages/Home/Home";
import ModalPost from "../ModalPost/ModalPost";
import { useEditorJWT } from "../../utils/jwt.store";

type PostInputProps = {
  onPost: (newPost: Posts) => void
}

const PostInput: FC<PostInputProps> = ({ onPost }) => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const jwtStore = useEditorJWT()
  
  const handleSendPost = (contentPost: string) => {
    axios.post("http://localhost:3333/api/posts/createpost", {
      "id": cookies.get("id") ?? "",
      "content": contentPost,
      "category": "js"
    }).then(({ data }) => {
      const newPost: Posts = {
        id: cookies.get("id") ?? "",
        username: cookies.get('username') ?? "",
        created_at: data.post.created_at_post,
        content: contentPost,
        like: "",
        post_id: data.post.post_id,
        category: "js",
        admin: data.admin,
      }
      onPost(newPost)
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  
  return (
    <div className={css.containerPost}>
      {jwtStore.getJwtToken() ?
        <div className={css.containerSendPost}>
          <ModalPost addPost={(str: string) => handleSendPost(str)}/>
        </div>
        : (
          <div className={css.containerNotConnected}>
          You need to be connected to send a story
        </div>
        )}
    </div>
  );
};

export default PostInput;