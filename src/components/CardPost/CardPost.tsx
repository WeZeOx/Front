import React, { FC, Dispatch, SetStateAction } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { AiOutlineHeart } from "react-icons/ai"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import cookies from "js-cookie";
import CardPostModalSettings from "../CardPostModalSettings/CardPostModalSettings";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

type CardPostProps = {
  post: Posts
  userConnectedIsAdmin: boolean
  indexCardPost?: number
  onDeletePost?: (post: Posts) => void
  onLike: (post: Posts) => void
  onUnlike: (post: Posts) => void
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
    axios.patch(`http://localhost:3333/api/posts/unlike/${post.post_id}`)
      .then(({ data }) => onUnlike(data))
      .catch((err) => console.log(err))
    onUnlike(post)
  }
  
  const handleLikePost = () => {
    axios.patch(`http://localhost:3333/api/posts/like/${post.post_id}`)
      .then(({ data }) => onLike(data))
      .catch((err) => console.log(err))
    onLike(post)
  }
  
  const handleDeletePost = () => {
    axios.delete(`http://localhost:3333/api/posts/deletepost/${post.post_id}`).then(({ data }) => data).catch((err) => console.log(err))
    if (setIdxModalToShow) setIdxModalToShow(null)
    if (onDeletePost) onDeletePost(post)
    navigate('/home')
  }
  
  return (
    <div className={css.containerChildPost}
         style={{ marginTop:window.location.href.split('/').includes('post') ? 40 : 0 }}>
      <div className={css.whoami}>
        <Avvvatars style="shape" value={post?.username ?? ""}/>
        <div className={css.contentUser}>
          <span className={css.username}>{post?.username ?? ""}</span>
          {post?.admin ? (<span className={css.isAdmin}>Administrator</span>) : null}
        </div>
        
        <div className={css.containerModal}>
          <FontAwesomeIcon
            onClick={() => {
              if (indexCardPost === idxModalToShow && setIdxModalToShow) setIdxModalToShow(null)
              else if (setIdxModalToShow) setIdxModalToShow(indexCardPost ?? 0)
            }}
            className={css.iconAdmin}
            icon={faEllipsisVertical}
          />
          
          {idxModalToShow === indexCardPost && userConnectedIsAdmin &&
            <CardPostModalSettings
              wantToShow="ADMIN_PANEL"
              handleDeletePost={handleDeletePost}
              setIdxModalToShow={setIdxModalToShow}
            />}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin && post.user_id === cookies.get('id') &&
            <CardPostModalSettings
              wantToShow="USER_PANEL"
              handleDeletePost={handleDeletePost}
              setIdxModalToShow={setIdxModalToShow}
            />}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin && !(post.user_id === cookies.get('id')) &&
            <CardPostModalSettings
              wantToShow="NOT_AUTHORIZED"
              handleDeletePost={handleDeletePost}
              setIdxModalToShow={setIdxModalToShow}
            />}
        </div>
      </div>
      
      <span className={css.contentPost}>{post?.content}</span>
      
      <div className={css.containerCategory}>
        
        {post?.categories?.length > 0 &&
          post?.categories?.split(', ')
            .map((categorie: string, idx: number) => <span key={idx} className={css.category}>{categorie}</span>
            )}
        
        <div className={css.containerLikeAndComment}>
          <div className={css.like}>
            <span className={css.iconLike}>{post?.like?.split(',').includes(cookies.get('id') ?? "") ?
              <FontAwesomeIcon icon={faHeart} onClick={handleUnlikePost}/> :
              <AiOutlineHeart onClick={handleLikePost}/>
            }
            </span>
            <span className={css.numberOfLike}>{post?.like.split(',').length - 1 ?? 0}</span>
          </div>
          <Link className={css.comment} to={`/post/${post?.post_id}`}>
            <span className={css.iconComment}><FaRegComment/></span>
            <span className={css.numberOfComment}>{post?.number_of_post}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPost;