import React, { FC } from 'react';
import { useParams } from "react-router-dom";

type MyProps = {}

const SinglePost: FC<MyProps> = () => {
  const { postId } = useParams()

  return (
    <div>
    </div>
  );
};

export default SinglePost;