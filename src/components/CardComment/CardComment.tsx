import React, { FC } from 'react';
import css from "./CardComment.module.scss"

type MyProps = {
  comment: {
    user_id: string,
    content_comment: string,
    created_at: Date,
    username: string
  }
}

const CardComment: FC<MyProps> = ({ comment }) => {
  return (
    <div className={css.childComment}>
      {comment.content_comment}
      {comment.username}
    </div>
  );
};

export default CardComment;