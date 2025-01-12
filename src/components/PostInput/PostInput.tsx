import React, { FC } from 'react';
import axios from "axios";
import css from './PostInput.module.scss'
import cookies from "js-cookie";
import { Posts } from "../../pages/Home/Home";
import PostCreator from "../PostCreator/PostCreator";
import { useEditorJWT } from "../../hooks/jwt.store";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../environment/env";

type PostInputProps = {
  onPost: (newPost: Posts) => void
}

const PostInput: FC<PostInputProps> = ({ onPost }) => {
  const navigate = useNavigate()
  const jwtStore = useEditorJWT()
  
  const handleSendPost = (contentPost: string, categoryTag: string) => {
    axios.post(`${baseUrl}/posts/createpost`, {
      "id": cookies.get("id") ?? "",
      "content": contentPost,
      "category": categoryTag
    }).then(({ data: newPost }) => onPost(newPost))
      .catch((err) => {
        console.log(err)
        navigate("/signin")
      })
  }
  
  return (
    <div className={css.containerPost} style={jwtStore.token ? { marginTop: - 20 } : { marginTop: - 112 }}>
      {jwtStore.token ? (
        <div className={css.containerSendPost}>
          <PostCreator
            addPost={(contentPost: string, categoryTag: string) => handleSendPost(contentPost, categoryTag)}/>
        </div>
      ) : (
        <div className={css.containerNotConnected}>You need to be connected to send a story</div>
      )}
    </div>
  );
};

export default PostInput;