import React, { FC } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"
import { DateTime, Interval } from "luxon";

type CardPostProps = {
  post: Posts
}

const CardPost: FC<CardPostProps> = ({ post }) => {
  
  return (
    <div className={css.containerChildPost}>
      
      <div className={css.whoami}>
        <Avvvatars style="shape" value={post.username}/>
        <div className={css.contentUser}>
          <span className={css.username}>{post.username}</span>
          {post.admin ? (<span className={css.isAdmin}>Administrator</span>) : null}
        </div>
      </div>
      
      
      <div className={css.contentPost}>
        {post.content.length > 500 ? post.content.slice(0, 250) + "..." : post.content}
        {/*{post.content}*/}
      </div>

    </div>
  );
};

export default CardPost;