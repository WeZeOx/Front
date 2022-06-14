import React, { ChangeEvent, FC, useState } from 'react';
import css from './PostCreator.module.scss'
import TextareaAutosize from 'react-textarea-autosize';

type ModalProps = {
  addPost: (contentPost: string, categoryTag: string) => void
}

const PostCreator: FC<ModalProps> = ({ addPost }) => {
  const [categoryTag, setCategoryTag] = useState<string>("")
  const [postText, setPostText] = useState<string>("")
  
  const onSubmit = () => {
    addPost(postText, categoryTag)
    setCategoryTag("")
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
            value={categoryTag}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCategoryTag(e.target.value)}
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