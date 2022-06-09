import React, { FC } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import cookies from "js-cookie";

type CardPostProps = {
  post: Posts
  userConnectedIsAdmin: boolean
  indexCardPost: number
  onDeletePost: (postId: Posts) => void
  idxModalToShow: number | null,
  setIdxModalToShow: React.Dispatch<React.SetStateAction<number | null>>
}

const CardPost: FC<CardPostProps> = ({
  post,
  userConnectedIsAdmin,
  onDeletePost,
  idxModalToShow,
  setIdxModalToShow,
  indexCardPost
}) => {
  
  const handleDeletePost = () => {
    axios.delete(`http://localhost:3333/api/posts/deletepost/${post.post_id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err))
    onDeletePost(post)
  }
  
  return (
    <div className={css.containerChildPost}>
      <div className={css.whoami}>
        <Avvvatars style="shape" value={post.username}/>
        <div className={css.contentUser}>
          <span className={css.username}>{post.username}</span>
          {post.admin ? (<span className={css.isAdmin}>Administrator</span>) : null}
        </div>
        
        <div className={css.containerModal}>
          <FontAwesomeIcon
            onClick={() => {
              if (indexCardPost === idxModalToShow) setIdxModalToShow(null)
              else setIdxModalToShow(indexCardPost)
            }}
            className={css.iconAdmin}
            icon={faEllipsisVertical}
          />
          
          {idxModalToShow === indexCardPost && userConnectedIsAdmin  ?
            (<div className={css.containerPopup}>ADMIN panel</div>)
            : null}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin  && post.user_id === cookies.get('id') ?
              (<div className={css.containerPopup}>CUSTOM panel</div>) :
            null}
          
          {idxModalToShow === indexCardPost && !userConnectedIsAdmin  && !(post.user_id === cookies.get('id')) ?
              (<div className={css.containerPopup}>NOT YOUR</div>) :
            null}
          
        </div>
      </div>
      
      <div className={css.contentPost}>{post.content}</div>
      <div className={css.containerCategory}>
        {post?.categories?.length > 0 ?
          post?.categories
            ?.split(', ')
            ?.map((categorie: string, idx: number) => (
              categorie.length > 0 ? <span key={idx} className={css.category}>{categorie}</span> : null
            ))
          : ""
        }
      </div>
    </div>
  );
};

export default CardPost;