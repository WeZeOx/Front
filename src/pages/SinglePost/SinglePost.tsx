import React, { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";

type MyProps = {}

const SinglePost: FC<MyProps> = () => {
  const { postId } = useParams()

  useEffect(() => {
  
  }, [])
  
  
  return (
    <div>
      {postId}
    </div>
  );
};

export default SinglePost;