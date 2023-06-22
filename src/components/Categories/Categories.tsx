import React, { FC } from 'react';
import { Posts } from "../../pages/Home/Home";
import css from "./Categories.module.scss";
import cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

type DisplayCategoriesProps = {
  onPostLike: () => void
  onPostUnlike: () => void
  post: Posts
}

const Categories: FC<DisplayCategoriesProps> = ({ post, onPostLike, onPostUnlike }) => {
  const handleLike = () => onPostLike()
  const handleunLike = () => onPostUnlike()
  
  return (
    <div className={css.containerLikeAndComment}>
      {post?.categories?.length > 0 &&
        post?.categories?.split(', ')
          .map((categorie: string, idx: number) => <span key={idx} className={css.category}>{categorie}</span>)
      }
      
      <div className={css.container}>
        <div className={css.like}>
            <span className={css.iconLike}>{post?.like?.split(',')?.includes(cookies.get('id') ?? "") ?
              <FontAwesomeIcon icon={faHeart} onClick={handleunLike}/> :
              <AiOutlineHeart onClick={handleLike}/>
            }
            </span>
          <span className={css.numberOfLike}>{post?.like.split(',').length - 1 ?? 0}</span>
        </div>
        <Link className={css.comment} to={`/post/${post?.post_id}`}>
          <span className={css.iconComment}><FaRegComment/></span>
          <span className={css.numberOfComment}>{post?.number_of_comment}</span>
        </Link>
      </div>
    </div>
  );
};

export default Categories;