import React, { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import css from './SinglePost.module.scss'
import { Posts } from "../Home/Home";
import CardPost from "../../components/CardPost/CardPost";
import { useEditorJWT } from "../../hooks/jwt.store";
import CardComment from "../../components/CardComment/CardComment";
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";

type MyProps = {}

type Comments = {
  admin: boolean,
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string
  }
}

const SinglePost: FC<MyProps> = () => {
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const [post, setPost] = useState<Posts>()
  const [comments, setComments] = useState<Comments[]>([])
  const [userConnectedIsAdmin, setUserConnectedIsAdmin] = useState<boolean>(false)
  const [contentComment, setContentComment] = useState<string>("")
  
  const jwtStore = useEditorJWT()
  const { postId } = useParams()
  
  const template = {
    "user_id":"1a90129e-5a3c-4b29-8547-fce2acffd838",
    "created_at":"2022-06-11T23:40:16.0764217+02:00",
    "username":"WeZeOx",
    "content":"aaa",
    "like":"1a90129e-5a3c-4b29-8547-fce2acffd838,",
    "post_id":"54f9a5ed-27b5-4c70-9e0b-404e41ad8cbc",
    "categories":"",
    "admin":true,
    "number_of_post":0
  }
  
  const handleNewComment = () => {
    axios.post('http://localhost:3333/api/comments/createcomment')
      .then(({ data }) => setComments([...comments]))
      .catch((err) => console.log(err))
  }
  
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/isadmin/`)
      .then(({ data }) => setUserConnectedIsAdmin(data.isAdmin))
      .catch((err) => console.log(err))
  }, [jwtStore.token])
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/comments/getpost/${postId}`)
      .then(({ data }) => {
        setComments(data.Comments)
        setPost(data.Post)
      })
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      <CardPost
        post={post || template}
        userConnectedIsAdmin={userConnectedIsAdmin}
        setIdxModalToShow={setIdxModalToShow}
        idxModalToShow={idxModalToShow}
        indexCardPost={0}
        onLike={(post: Posts) => setPost(post)}
        onUnlike={(post: Posts) => setPost(post)}
      />
      
      <div className={css.containerCreateComment}>
        <div className={css.containerField}>
          <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>
          <input className={css.contentComment} value={contentComment}
                 onChange={(e) => setContentComment(e.target.value)}/>
          <button onClick={handleNewComment} className={css.sendComment}>Send</button>
        </div>
      </div>
      
      {comments.map((comment) => (<div><CardComment comment={comment.comment}/></div>))}
    </>
  );
};

export default SinglePost;