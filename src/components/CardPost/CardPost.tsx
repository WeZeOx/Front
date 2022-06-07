import React, { FC } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

type CardPostProps = {
  post: Posts
  userConnectedIsAdmin: boolean
}

const CardPost: FC<CardPostProps> = ({ post, userConnectedIsAdmin }) => {
  return (
    <div className={css.containerChildPost}>
      <div className={css.whoami}>
        <Avvvatars style="shape" value={post.username}/>
        <div className={css.contentUser}>
          <span className={css.username}>{post.username}</span>
          {post.admin ? (<span className={css.isAdmin}>Administrator</span>) : null}
        </div>
        {userConnectedIsAdmin ? (
          <FontAwesomeIcon onClick={() => console.log('are you an admin ?')} className={css.iconAdmin} icon={faEllipsisVertical}/>
          ) : (
            <FontAwesomeIcon onClick={() => console.log('pff you are not an admin')} className={css.iconAdmin} icon={faEllipsisVertical}/> )}
      </div>
      <div className={css.contentPost}>{post.content}</div>
      
      <div className={css.containerCategory}>
        {post?.category?.length > 0 ?
          post?.category
            ?.split(',')
            ?.map((categ, idx) => (
              categ.length > 0 ? <span key={idx} className={css.category}>{categ}</span> : null
            ))
          : ""
        }
      </div>
    </div>
  );
};

export default CardPost;