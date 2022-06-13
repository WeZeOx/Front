import React, { Dispatch, FC, SetStateAction } from 'react';
import css from "./SectionSearchCategory.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type SectionSearchCategoryProps = {
  contentSearch: string,
  setContentSearch: Dispatch<SetStateAction<string>>
}

const SectionSearchCategory: FC<SectionSearchCategoryProps> = ({ setContentSearch, contentSearch }) => {
  return (
    <div className={css.containerSearch}>
      <div className={css.search}>
        <FontAwesomeIcon className={css.searchIcon} icon={faMagnifyingGlass}/>
        <input
          className={css.inputSearchTAG}
          value={contentSearch}
          placeholder="Search a category"
          onChange={(e) => setContentSearch(e.target.value)}/>
      </div>
    </div>
  );
};

export default SectionSearchCategory;