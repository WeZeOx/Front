import React, { FC, Dispatch, SetStateAction } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import cookies from "js-cookie";
import CardPostModalSettings from "../CardPostModalSettings/CardPostModalSettings";
import { useNavigate } from "react-router-dom";
import Categories from "../Categories/Categories";
import { baseUrl } from "../../environment/env";

type CardPostProps = {
  post: Posts
  userConnectedIsAdmin: boolean,
  indexCardPost?: number,
  onDeletePost?: (post: Posts) => void,
  onLike: (post: Posts) => void,
  onUnlike: (post: Posts) => void,
  idxModalToShow: number | null,
  setIdxModalToShow: Dispatch<SetStateAction<number | null>>
}

const CardPost: FC<CardPostProps> = ({
  post,
  userConnectedIsAdmin,
  onDeletePost,
  onLike,
  onUnlike,
  idxModalToShow,
  setIdxModalToShow,
  indexCardPost
}) => {
  const navigate = useNavigate()
  
  const handleUnlikePost = () => {
    axios.patch(`${baseUrl}/posts/unlike/${post.post_id}`)
      .then(({ data }) => onUnlike(data))
      .catch((err) => err)
    onUnlike(post)
  }
  
  const handleLikePost = () => {
    axios.patch(`${baseUrl}/posts/like/${post.post_id}`)
      .then(({ data }) => onLike(data))
      .catch((err) => err)
    onLike(post)
  }
  
  const handleDeletePost = () => {
    axios.delete(`${baseUrl}/posts/deletepost/${post.post_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    setIdxModalToShow(null)
    if (onDeletePost) onDeletePost(post)
    navigate('/home')
  }
  
  return (
    <div className={css.containerChildPost}
         style={{ marginTop: window.location.href.split('/')?.includes('post') ? 40 : 0 }}>
      <div className={css.whoami}>
        <Avvvatars style="shape" value={post?.username ?? ""}/>
        <div className={css.contentUser}>
          <span className={css.username}>{post?.username ?? ""}</span>
          {post?.admin && (<span className={css.isAdmin}>Administrator</span>)}
        </div>
        <div className={css.containerModal}>
          <FontAwesomeIcon
            onClick={() => indexCardPost === idxModalToShow && setIdxModalToShow ? setIdxModalToShow(null) : setIdxModalToShow(indexCardPost ?? 0)}
            className={css.iconAdmin}
            icon={faEllipsisVertical}
          />
          
          {idxModalToShow === indexCardPost && userConnectedIsAdmin &&
            <CardPostModalSettings wantToShow="ADMIN_PANEL" handleDeletePost={handleDeletePost}
                                   setIdxModalToShow={setIdxModalToShow}/>}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin && post.user_id === cookies.get('id') &&
            <CardPostModalSettings wantToShow="USER_PANEL" handleDeletePost={handleDeletePost}
                                   setIdxModalToShow={setIdxModalToShow}/>}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin && !(post.user_id === cookies.get('id')) &&
            <CardPostModalSettings wantToShow="NOT_AUTHORIZED" handleDeletePost={handleDeletePost}
                                   setIdxModalToShow={setIdxModalToShow}/>}
        </div>
      </div>
      <span className={css.contentPost}>{post?.content}</span>
      <div className={css.containerCategory}>
        <Categories
          onPostUnlike={() => handleUnlikePost()}
          onPostLike={() => handleLikePost()}
          post={post}
        />
      </div>
    </div>
  );
};

export default CardPost;