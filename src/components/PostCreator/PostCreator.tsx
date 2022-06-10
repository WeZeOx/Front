import React, { ChangeEvent, FC, useRef, useState } from 'react';
import css from './PostCreator.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

type ModalProps = {
  addPost: (contentPost: string, categoryTag: string) => void
}

const PostCreator: FC<ModalProps> = ({ addPost }) => {
  const categoryTag = useRef() as React.MutableRefObject<HTMLInputElement>
  const [postText, setPostText] = useState<string>("")
  
  const onSubmit = () => {
    addPost(postText, categoryTag.current.value)
    categoryTag.current.value = ""
    setPostText("")
  }
  
  return (
    <div className={css.containerModal}>
      <div className={css.up}>
        <span className={css.titlePost}>Welcome !</span>
      </div>
      <div className={css.middle}>
        <TextareaAutosize
          placeholder="What's your next story ?!"
          value={postText}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
          className={css.inputUser}
        />
      </div>
      <div className={css.down}>
        <div className={css.tagContainer}>
          <input
            placeholder="Category : humor, anime"
            ref={categoryTag}
            className={css.inputTag}
          />
        </div>
        <button
          style={{ cursor:postText.length > 0 ? "pointer" : "not-allowed" }}
          className={css.button}
          onClick={onSubmit}
        >
          Post your story
        </button>
      </div>
    </div>
  );
};

export default PostCreator;