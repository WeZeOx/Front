import React, { FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Posts } from "../Home/Home";
import CardPost from "../../components/CardPost/CardPost";
import { useEditorJWT } from "../../hooks/jwt.store";
import CardComment from "../../components/CardComment/CardComment";

type MyProps = {}


type response = {
  Comments: any[]
  Post: Posts
}

const SinglePost: FC<MyProps> = () => {
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const jwtStore = useEditorJWT()
  const { postId } = useParams()
  const [post, setPost] = useState<Posts>()
  const [res2, setRes2] = useState<response>()
  const [userConnectedIsAdmin, setUserConnectedIsAdmin] = useState<boolean>(false)
  const template = {
    "user_id": "1a90129e-5a3c-4b29-8547-fce2acffd838",
    "created_at": "2022-06-11T23:40:16.0764217+02:00",
    "username": "WeZeOx",
    "content": "aaa",
    "like": "1a90129e-5a3c-4b29-8547-fce2acffd838,",
    "post_id": "54f9a5ed-27b5-4c70-9e0b-404e41ad8cbc",
    "categories": "",
    "admin": true,
    "number_of_post": 0
  }
  
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/isadmin/`)
      .then(({ data }) => setUserConnectedIsAdmin(data.isAdmin))
      .catch((err) => console.log(err))
  }, [jwtStore.token])
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/comments/getpost/${postId}`)
      .then(({ data }) => {
        setRes2(data.Comments)
        setPost(data.Post)
      })
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <div>
      <CardPost
        post={post || template}
        userConnectedIsAdmin={userConnectedIsAdmin}
        setIdxModalToShow={setIdxModalToShow}
        idxModalToShow={idxModalToShow}
        indexCardPost={0}
        onLike={(post: Posts) => setPost(post)}
        onUnlike={(post: Posts) => setPost(post)}
      />
      {/*<CardComment props={res2} />*/}
    </div>
  );
};

export default SinglePost;