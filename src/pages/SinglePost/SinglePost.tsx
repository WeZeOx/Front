import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Posts } from "../Home/Home";
import CardPost from "../../components/CardPost/CardPost";
import { useEditorJWT } from "../../hooks/jwt.store";
import postCreator from "../../components/PostCreator/PostCreator";
import cookies from "js-cookie";

type MyProps = {}


type response = {
  Comments: any[]
  Post: Posts
}

const SinglePost: FC<MyProps> = () => {
  const [idxModalToShow, setIdxModalToShow] = useState<number | null>(null)
  const jwtStore = useEditorJWT()
  const { postId } = useParams()
  const [res, setRes] = useState<Posts>()
  const [userConnectedIsAdmin, setUserConnectedIsAdmin] = useState<boolean>(false)
  
  const onLike = (post: Posts) => {
    post.like += cookies.get('id')
  }
  
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/users/isadmin/`)
      .then(({ data }) => setUserConnectedIsAdmin(data.isAdmin))
      .catch((err) => console.log(err))
  }, [jwtStore.token])
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/comments/getpost/${postId}`)
      .then(({ data }) => setRes(data.Post))
      .catch((err) => console.log(err))
  }, [])
  
  return (
    <div>
      <CardPost
        // @ts-ignore
        post={res}
        userConnectedIsAdmin={userConnectedIsAdmin}
        setIdxModalToShow={setIdxModalToShow}
        idxModalToShow={idxModalToShow}
        indexCardPost={0}
        onLike={(post: Posts) => setRes(post)}
        onUnlike={(post: Posts) => setRes(post)}
      />
    </div>
  );
};

export default SinglePost;