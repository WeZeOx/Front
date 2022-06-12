import React, { FC } from 'react';

type MyProps = {
  props: any[]
}

const CardComment:FC<MyProps> = ({props}) => {
  return (
    <div>
      {props?.map((item) => <div>{item?.comment?.username}</div>)}
    </div>
  );
};

export default CardComment;