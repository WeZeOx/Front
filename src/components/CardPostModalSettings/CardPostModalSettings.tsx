import React, { FC, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faClose } from "@fortawesome/free-solid-svg-icons";
import css from "./CardPostModalSettings.module.scss";


type CardPostModalSettingsProps = {
  wantToShow: string,
  handleDeletePost: () => void,
  setIdxModalToShow?: Dispatch<SetStateAction<number | null>>
}


const CardPostModalSettings: FC<CardPostModalSettingsProps> = ({ setIdxModalToShow, handleDeletePost, wantToShow }) => {
  if (setIdxModalToShow === undefined) return <div>PLEASE CONTACT AN ADMINISTRATOR IF YOU SEE THIS MESSAGE</div>
  
  switch (wantToShow) {
    case "ADMIN_PANEL":
      return (
        <div className={css.containerPopup}>
          <div className={css.containerCross}>
            <FontAwesomeIcon onClick={() => setIdxModalToShow(null)} className={css.closeIcon} icon={faClose}/>
            <div className={css.chooses}>
              <div className={css.choose} onClick={handleDeletePost}>
                <FontAwesomeIcon className={css.icon} icon={faBan}/>
                <span className={css.title}>Delete this story</span>
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
          </div>
          <div className={css.chooses}>
            <div className={css.choose} onClick={handleDeletePost}>
              <FontAwesomeIcon className={css.icon} icon={faBan}/>
              <span className={css.title}>Delete your story</span>
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

export default CardPostModalSettings;