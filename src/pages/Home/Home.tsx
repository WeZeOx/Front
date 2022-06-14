import React, { FC, useEffect, useState } from 'react';
import axios from "axios";
import PostInput from "../../components/PostInput/PostInput";
import CardPost from "../../components/CardPost/CardPost";
import css from './Home.module.scss'
import cookies from "js-cookie";
import SectionSearchCategory from "../../components/SectionSearchCategory/SectionSearchCategory";
import { useEditorAdmin } from "../../hooks/isadmin.store";
import FilterPost from "../../components/FilterPost/FilterPost";

export type Posts = {
  user_id: string,
  created_at: string,
  username: string,
  content: string,
  like: string,
  post_id: string,
  categories: string,
  admin: boolean,
  number_of_comment: number
}

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  const [filter, setFilter] = useState<string>("")
  const [contentSearch, setContentSearch] = useState<string>("")
  const [posts, setPosts] = useState<Posts[]>([])
  const [numberOfPost, setNumberOfPost] = useState<number>(12)
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const adminStore = useEditorAdmin()
  
  const unlikePost = (post: Posts) => {
    post.like = post.like.split(',').filter((reserch) => reserch !== cookies.get('id')).join(',')
    setPosts((prevState) => [...prevState])
  }
  
  const likePost = (post: Posts) => {
    const newLikeField = post.like += cookies.get('id') + ","
    setPosts((prevState) => prevState.filter((state) => state.post_id === post.post_id ? {
      ...state,
      [state.like]: newLikeField
    } : state))
  }
  
  const removePost = (post: Posts) => {
    const indexPost = posts.indexOf(post)
    setPosts((prevState: Posts[]) => prevState.filter((state: Posts, idx: number) => idx !== indexPost))
  }
  
  const addMorePost = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > (document?.scrollingElement?.scrollHeight ?? 0)) {
      setNumberOfPost((prevNumberOfPost) => prevNumberOfPost + 10)
    }
  }
  
  useEffect(() => {
    axios.get<Posts[]>("http://localhost:3333/api/posts/all")
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err))
    window.addEventListener('scroll', addMorePost)
    return () => window.removeEventListener('scroll', addMorePost)
  }, [])
  
  return (
    <>
      <SectionSearchCategory
        contentSearch={contentSearch}
        setContentSearch={setContentSearch}
      />
      <FilterPost
        setFilter={setFilter}
      />
      <PostInput
        onPost={(newPost: Posts) => setPosts((prevState) => prevState?.length > 0 ? [...prevState, newPost] : [newPost])
        }
      />
      <div className={css.containerPost}>
        {posts
          .sort((a: Posts, b: Posts) => {
            if (filter === "MOST_LIKE") return b.like.split(',').length - a.like.split(',').length
            else if (filter === "OLD_POST") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            else return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          })
          .slice(0, numberOfPost)
          .map((post: Posts, idx: number) => (
            post.categories.includes(contentSearch) &&
            <CardPost
              indexCardPost={idx}
              idxModalToShow={idxModalToShow}
              setIdxModalToShow={setIdxModalToShow}
              userConnectedIsAdmin={adminStore.isAdmin}
              post={post}
              onDeletePost={(post: Posts) => removePost(post)}
              onLike={(post: Posts) => likePost(post)}
              onUnlike={(post: Posts) => unlikePost(post)}
              key={idx}
            />
          ))}
      </div>
    </>
  );
};
export default Home;
