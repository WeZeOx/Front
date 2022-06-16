import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import css from "./CommentCreator.module.scss";
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";

type CommentCreatorProps = {
  contentComment: string,
  setContentComment: Dispatch<SetStateAction<string>>
  onComment: () => void
}

const CommentCreator:FC<CommentCreatorProps> = ({contentComment, setContentComment, onComment}) => {
  return (
    <div className={css.containerCreateComment}>
      <div className={css.containerField}>
        <Avvvatars value={cookies.get('username') ?? ""} style="shape"/>
        <input
          placeholder="Any comment ?!"
          className={css.contentComment} value={contentComment}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setContentComment(e.target.value)}
        />
        <button onClick={onComment} className={css.sendComment}>Send</button>
      </div>
    </div>
  );
};

export default CommentCreator;