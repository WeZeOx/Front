import React, { Dispatch, FC, SetStateAction } from 'react';
import css from "./CardCommentModalSettings.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faClose } from "@fortawesome/free-solid-svg-icons";

type CardCommentModalSettingsProps = {
  wantToShow: string,
  handleDeleteComment: () => void,
  setIdxModalToShow: Dispatch<SetStateAction<number | null>>,
}

const CardCommentModalSettings:FC<CardCommentModalSettingsProps> = ({
  wantToShow,
  handleDeleteComment,
  setIdxModalToShow
}) => {
  switch (wantToShow) {
    case "ADMIN_PANEL":
      return (
        <div className={css.containerPopup}>
          <div className={css.containerCross}>
            <FontAwesomeIcon onClick={() => setIdxModalToShow(null)} className={css.closeIcon} icon={faClose}/>
            <div className={css.chooses}>
              <div className={css.choose} onClick={handleDeleteComment}>
                <FontAwesomeIcon className={css.icon} icon={faBan}/>
                <span className={css.title}>Delete this comment</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "USER_PANEL":
      return (
        <div className={css.containerPopup}>
          <div className={css.containerCross}>
            <FontAwesomeIcon onClick={() => setIdxModalToShow(null)} className={css.closeIcon} icon={faClose}/>
            <div className={css.chooses}>
              <div className={css.choose} onClick={handleDeleteComment}>
                <FontAwesomeIcon className={css.icon} icon={faBan}/>
                <span className={css.title}>Delete your comment</span>
              </div>
            </div>
          </div>
        </div>
      )
    case "NOT_AUTHORIZED":
      return (
        <div className={css.containerPopup}>
          <span>Oh you just found an easter egg</span>
        </div>
      )
    default:
      return (
        <div className={css.containerPopup}>
          <span>An error occured</span>
        </div>
      )
  }
};

export default CardCommentModalSettings;