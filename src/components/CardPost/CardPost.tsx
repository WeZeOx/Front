import React, { FC } from 'react';
import { Posts } from "../../pages/Home/Home";
import Avvvatars from 'avvvatars-react'
import css from "./CardPost.module.scss"

type CardPostProps = {
  post: Posts
}

const CardPost: FC<CardPostProps> = ({ post}) => {
  return (
    <div className={css.containerChildPost}>
      <Avvvatars style="shape" value={post.username} />
      {post.admin ? <span style={{ color: "red" }}>{post.username}</span> : <span>{post.username}</span>}
      <div>{post.content}</div>
    </div>
  );
};

export default CardPost;