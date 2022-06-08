import React, { FC, useRef, useState } from 'react';
import css from './ModalPost.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

type ModalProps = {
  addPost: (contentPost: string, categoryTag: string) => void
}

const ModalPost: FC<ModalProps> = ({ addPost }) => {
  const categoryTag = useRef() as React.MutableRefObject<HTMLInputElement>
  const postText = useRef() as React.MutableRefObject<HTMLTextAreaElement>

  
  const onSubmit = () => {
    addPost(postText.current.value, categoryTag.current.value)
    categoryTag.current.value = ""
    postText.current.value = ""
  }
  
  return (
    <div className={css.containerModal}>
      <div className={css.up}>
        <span className={css.titlePost}>Welcome !</span>
      </div>
      <div className={css.middle}>
        <TextareaAutosize
          placeholder="What's your next story ?!"
          ref={postText}
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
          style={{ cursor: postText?.current?.value?.length > 0 ? "pointer" : "not-allowed" }}
          className={css.button}
          onClick={onSubmit}
        >
          Post your story
        </button>
      </div>
    </div>
  );
};

export default ModalPost;