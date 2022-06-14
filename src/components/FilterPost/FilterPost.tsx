import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import css from "./FilterPost.module.scss"
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "../../hooks/useQuery";
import { mergeCssClass } from "../../utils/utils";

type FilterPostProps = {
  setFilter: Dispatch<SetStateAction<string>>
}

const FilterPost: FC<FilterPostProps> = ({setFilter}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const query = useQuery();

  useEffect(() => {
    const params = query.get("filter")
    
    if (params === "MOST_LIKE") setFilter("MOST_LIKE")
    else if (params === "OLD_POST") setFilter("OLD_POST")
    else setFilter("")
  }, [query])
  
  
  return (
    <div className={css.containerShow}>
      <div className={css.back} onClick={() => setShowModal((prevState) => !prevState)}>
        <span className={mergeCssClass([css.noSelect, css.titleFilter])}>Filter Selector</span>
        {showModal ? <RiArrowDropDownLine style={{ transform: "rotate(180deg)" }} className={css.titleFilter}/> :
          <RiArrowDropDownLine className={css.titleFilter}/>}
        
        {showModal && (
          <div className={css.containerFilterModal}>
            <div className={css.choose}><Link to="/home">Latest Post</Link></div>
            <div className={css.choose}><Link to="/home?filter=MOST_LIKE">Most Liked Post</Link></div>
            <div className={css.choose}><Link to="/home?filter=OLD_POST">Oldest post</Link></div>
          </div>)}
      </div>
    </div>
  );
};

export default FilterPost;