import React, { Dispatch, FC, SetStateAction } from 'react';
import css from "./CardComment.module.scss"
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useEditorAdmin } from "../../hooks/isadmin.store";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import CardCommentModalSettings from "../CardCommentModalSettings/CardCommentModalSettings";
import { baseUrl } from "../../environment/env";

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
  onDeleteComment: (commentId: string) => void
  idxModalToShow: number | null
  indexCardComment: number
  setIdxModalToShow: Dispatch<SetStateAction<number | null>>
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string,
    like: string,
    comment_id: string
  }
}

const CardComment: FC<CardCommentProps> = ({
  comment,
  admin,
  onCommentLike,
  onCommentunLike,
  onDeleteComment,
  idxModalToShow,
  setIdxModalToShow,
  indexCardComment
}) => {
  const adminStore = useEditorAdmin()

  const handleLikeComment = () => {
    axios.patch(`${baseUrl}/comments/like/${comment.comment_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    onCommentLike(comment)
  }
  
  const handleunLikeComment = () => {
    axios.patch(`${baseUrl}/comments/unlike/${comment.comment_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    onCommentunLike(comment)
  }
  
  const handleDeleteComment = () => {
    axios.delete(`${baseUrl}/comments/deletecomment/${comment.comment_id}`)
      .then(({data}) => data)
      .catch((error) => console.log(error))
    setIdxModalToShow(null)
    onDeleteComment(comment.comment_id)
  }
  
  return (
    <div className={css.childComment}>
      <div className={css.containerInfoUser}>
        <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>
        <div className={css.userInfo}>
          <span className={css.usernameComment}>{comment.username}</span>
          {admin && <span className={css.isAdmin}>Administrator</span>}
        </div>
        <div className={css.containerModal}>
          <FontAwesomeIcon
            onClick={() => indexCardComment === idxModalToShow && setIdxModalToShow ? setIdxModalToShow(null) : setIdxModalToShow(indexCardComment ?? 0)}
            className={css.iconAdmin}
            icon={faEllipsisVertical}
          />
          {idxModalToShow === indexCardComment && adminStore.isAdmin &&
            <CardCommentModalSettings wantToShow="ADMIN_PANEL" handleDeleteComment={handleDeleteComment}
                                      setIdxModalToShow={setIdxModalToShow}/>}
  
          {idxModalToShow === indexCardComment && !adminStore.isAdmin && comment.user_id === cookies.get('id') &&
            <CardCommentModalSettings wantToShow="USER_PANEL" handleDeleteComment={handleDeleteComment}
                                      setIdxModalToShow={setIdxModalToShow}/>}
  
          {idxModalToShow === indexCardComment && !adminStore.isAdmin && !(comment.user_id === cookies.get('id')) &&
            <CardCommentModalSettings wantToShow="NOT_AUTHORIZED" handleDeleteComment={handleDeleteComment}
                                      setIdxModalToShow={setIdxModalToShow}/>}
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