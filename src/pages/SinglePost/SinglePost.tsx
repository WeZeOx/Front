import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import css from './SinglePost.module.scss'
import { Posts } from "../Home/Home";
import CardPost from "../../components/CardPost/CardPost";
import CardComment, { Comment } from "../../components/CardComment/CardComment";
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";
import { useEditorAdmin } from "../../hooks/isadmin.store";

type MyProps = {}

export type Comments = {
  admin: boolean,
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string
    like: string
    comment_id: string
  }
}

const SinglePost: FC<MyProps> = () => {
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const [post, setPost] = useState<Posts>()
  const [comments, setComments] = useState<Comments[]>([])
  const [contentComment, setContentComment] = useState<string>("")
  const adminStore = useEditorAdmin()
  const { postId } = useParams()
  
  const onLikeComment = (comment: Comment) => {
    const newLikeField = comment.like += cookies.get('id') + ","
    setComments((prevState) => prevState.filter((state: Comments) => state.comment.comment_id === comment.comment_id ? {
      ...state,
      [ state.comment.comment_id ]:newLikeField
    } : state))
  }
  
  const onCommentunLike = (comment: Comment) => {
    comment.like = comment.like.split(',').filter((reserch: string) => reserch !== cookies.get('id')).join(',')
    setComments((prevState) => [...prevState])
  }
  
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
          like:"",
          comment_id:data.comment.comment_id
        }
      }
      setComments((prevState) => prevState?.length > 0 ? [...prevState, newComment] : [newComment])
    }).catch((err) => console.log(err))
    setContentComment("")
  }
  
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
            userConnectedIsAdmin={adminStore.isAdmin}
            setIdxModalToShow={setIdxModalToShow}
            idxModalToShow={idxModalToShow}
            indexCardPost={0}
            onLike={(post: Posts) => setPost(post)}
            onUnlike={(post: Posts) => setPost(post)}
          />

          <div className={css.containerCreateComment}>
            <div className={css.containerField}>
              <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>
              <input
                placeholder="Any comment ?!"
                className={css.contentComment} value={contentComment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setContentComment(e.target.value)}
              />
              <button onClick={handleNewComment} className={css.sendComment}>Send</button>
            </div>
          </div>
          {comments?.length ? comments?.map((comment: Comments, idx: number) => (
              <CardComment
                key={idx}
                admin={comment.admin ?? false}
                comment={comment.comment}
                onCommentLike={(comment: Comment) => onLikeComment(comment)}
                onCommentunLike={(comment: Comment) => onCommentunLike(comment)}
              />
            )) : <div className={css.containerEmpty}><span className={css.titleEmpty}>Ohh such empty</span></div>}
        </>}
    </>
  )
}

export default SinglePost;