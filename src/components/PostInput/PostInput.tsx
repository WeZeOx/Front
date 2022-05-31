import React, { FC, useEffect, useState } from 'react';
import axios from "axios";

type userSchema = {
  id: string
}

const PostInput: FC<userSchema> = ({ id }) => {
  const [username, setUsername] = useState<string>("");
  
  useEffect(() => {
    axios.get(`http://localhost:3333/api/${id}`)
      .then((res) => setUsername(res.data.username))
  }, [])
  
  return <span>{username}</span>
};

export default PostInput;