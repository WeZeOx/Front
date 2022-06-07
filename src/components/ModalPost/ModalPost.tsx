import React, { FC, useState } from 'react';
import css from './ModalPost.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

type MyProps = {
  addPost: (str: string) => void
}

const ModalPost: FC<MyProps> = ({ addPost }) => {
  const [postText, setPostText] = useState<string>("")
  
  const onSubmit = () => {
    addPost(postText)
    setPostText("")
  }
  
  return (
    <div className={css.containerModal}>
      <div className={css.up}>
        <span className={css.titlePost}>Welcome !</span>
      </div>
      <div className={css.middle}>
        <TextareaAutosize
          maxLength={150}
          placeholder="What's up !"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className={css.inputUser}
        />
      </div>
      <div className={css.down}>
        <span className={css.counter}>{postText.length > 0 ? `${postText.length} / 150` : ""}</span>
        <button style={{ cursor: postText.length > 0 ? "pointer" : "not-allowed" }} className={css.button}
                onClick={onSubmit}>Post your story
        </button>
      </div>
    </div>
  );
};

export default ModalPost;