import React, { FC, useState } from 'react';
import axios from "axios";
import css from './PostInput.module.scss'
import cookies from "js-cookie";
import { Posts } from "../../pages/Home/Home";
import PostCreator from "../PostCreator/PostCreator";
import { useEditorJWT } from "../../hooks/jwt.store";

type PostInputProps = {
  onPost: (newPost: Posts) => void
}

const PostInput: FC<PostInputProps> = ({ onPost }) => {
  const [errorMessage, setErrorMessage] = useState<string>("")
  const jwtStore = useEditorJWT()
  
  const handleSendPost = (contentPost: string, categoryTag: string) => {
    axios.post("http://localhost:3333/api/posts/createpost", {
      "id": cookies.get("id") ?? "",
      "content": contentPost,
      "category": categoryTag
    }).then(({ data }) => {
      const newPost: Posts = {
        user_id: cookies.get("id") ?? "",
        username: cookies.get('username') ?? "",
        created_at: data.post.created_at_post,
        content: contentPost,
        like: "",
        post_id: data.post.post_id,
        categories: data.post.category,
        admin: data.admin,
        number_of_post: 0
      }
      onPost(newPost)
    }).catch((err) => setErrorMessage(err.response.data.message))
  }
  
  return (
    <div className={css.containerPost}>
      {jwtStore.token ?
        <div className={css.containerSendPost}>
          <PostCreator addPost={(contentPost: string, categoryTag: string) => handleSendPost(contentPost, categoryTag)}/>
        </div>
        : (
          <div className={css.containerNotConnected}>You need to be connected to send a story</div>
        )}
    </div>
  );
};

export default PostInput;