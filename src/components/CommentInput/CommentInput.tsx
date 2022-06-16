import React, { Dispatch, FC, SetStateAction } from 'react';
import { useEditorJWT } from "../../hooks/jwt.store";
import CommentCreator from "../CommentCreator/CommentCreator";
import css from "./CommentInput.module.scss";

type CommentInputProps = {
  contentComment: string,
  setContentComment: Dispatch<SetStateAction<string>>
  handleNewComment: () => void
}

const CommentInput: FC<CommentInputProps> = ({ contentComment, setContentComment, handleNewComment }) => {
  const jwtStore = useEditorJWT()
  
  return (
    <div>
      {jwtStore.token ?
        <CommentCreator
          contentComment={contentComment}
          setContentComment={setContentComment}
          onComment={handleNewComment} />
        : <div className={css.containerNotConnected}>You need to post a comment</div>
      } </div>
  )
};

export default CommentInput;