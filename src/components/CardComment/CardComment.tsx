import React, { FC } from 'react';
import css from "./CardComment.module.scss"
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

export type Comment = {
  user_id: string;
  content_comment: string;
  created_at: Date;
  username: string;
  like: string;
  comment_id: string
}

type CardCommentProps = {
  admin: boolean,
  onCommentLike: (comment: Comment) => void
  onCommentunLike: (comment: Comment) => void
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string,
    like: string,
    comment_id: string
  }
}

const CardComment: FC<CardCommentProps> = ({ comment, admin, onCommentLike, onCommentunLike }) => {
  
  const handleLikeComment = () => {
    axios.patch(`http://localhost:3333/api/comments/like/${comment.comment_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    
    onCommentLike(comment)
  }
  
  const handleunLikeComment = () => {
    axios.patch(`http://localhost:3333/api/comments/unlike/${comment.comment_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    onCommentunLike(comment)
  }
  
  return (
    <div className={css.childComment}>
      <div className={css.containerInfoUser}>
        <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>
        <div className={css.userInfo}>
          <span className={css.usernameComment}>{comment.username}</span>
          {admin ? (<span className={css.isAdmin}>Administrator</span>) : null}
        </div>
      </div>
      <span className={css.content}>{comment.content_comment}</span>
      
      <div className={css.containerLike}>
        {comment?.like?.split(',')?.includes(cookies.get('id') ?? "") ?
          <FontAwesomeIcon icon={faHeart} onClick={handleunLikeComment}/> :
          <AiOutlineHeart onClick={handleLikeComment}/>}
        <span className={css.numberOfLike}>{comment?.like?.split(',').length - 1}</span>
      </div>
    </div>
  );
};

export default CardComment;