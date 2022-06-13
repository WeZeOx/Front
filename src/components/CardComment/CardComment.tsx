import React, { FC } from 'react';
import css from "./CardComment.module.scss"
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { AiOutlineHeart } from "react-icons/ai";

type MyProps = {
  admin: boolean,
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string,
    like: string
  }
}

const CardComment: FC<MyProps> = ({ comment, admin }) => {
  
  const handleLikePost = () => {
  }
  const handleunLikePost = () => {
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
          <FontAwesomeIcon icon={faHeart} onClick={handleLikePost}/> :
          <AiOutlineHeart onClick={handleunLikePost}/>
        }
        <span>0</span>
      </div>
    </div>
  );
};

export default CardComment;