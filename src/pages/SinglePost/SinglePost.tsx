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
  const [post, setPost] = useState<Posts>() ?? {}
  const [comments, setComments] = useState<Comments[]>([])
  const [userConnectedIsAdmin, setUserConnectedIsAdmin] = useState<boolean>(false)
  const [contentComment, setContentComment] = useState<string>("")
  const jwtStore = useEditorJWT()
  const { postId } = useParams()
  
  const handleNewComment = () => {
    axios.post('http://localhost:3333/api/comments/createcomment', {
      "post_id":postId,
      "content_comment":contentComment
    }).then(({ data }) => {
      const newComment: Comments = {
        admin:data.isAdmin,
        comment:{
          content_comment:data.comment.content_comment,
          username:data.username,
          user_id:data.comment.user_id,
          created_at:data.comment.created_at_comment,
        }
      }
      setComments([newComment, ...comments])
    }).catch((err) => console.log(err))
    setContentComment("")
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
      }).catch((err) => console.log(err))
  }, [])
  
  return (
    <>
      {post !== undefined &&
        <>
          <CardPost
            post={post}
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
          {comments?.length ? comments?.map((comment: Comments, idx: number) => (
            <CardComment key={idx} admin={comment.admin} comment={comment.comment}/>)) :
            (<div className={css.containerField}><span>Ohh such empty</span></div>)}
        </>}
    </>
  )
}

export default SinglePost;