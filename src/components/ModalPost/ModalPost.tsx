import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import css from './ModalPost.module.scss'
import Avvvatars from "avvvatars-react";
import cookies from "js-cookie";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MyProps = {
  deleteModal: () => void
  addPost: (str: string) => void
}

const ModalPost: FC<MyProps> = ({ addPost, deleteModal }) => {
  const [contentPost, setContentPost] = useState<string>('')
  
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPost(contentPost)
  }
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])
  
  return (
    <div className={css.containerModal}>
      <div className={css.upModal}>
        <span className={css.title}>Create your own story</span>
        <FontAwesomeIcon onClick={() => deleteModal()} className={css.closeIcon} icon={faClose}/>
      </div>
      <hr/>
      <div className={css.middleModal}>
        <Avvvatars style='shape' value={cookies.get('username') ?? ""}/>
        <span>{cookies.get('username')}</span>
      </div>
      
      <form className={css.form} onSubmit={(e: FormEvent<HTMLFormElement>) => onSubmit(e)}>
          
          <textarea className={css.area} placeholder="Write your story here"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContentPost(e.target.value)}/>
        <div className={css.containerButton}>
          <button className={contentPost.length > 0 ? css.button : css.disabled} type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default ModalPost;