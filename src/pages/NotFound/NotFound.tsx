import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/home')
  }, [])
  
  return (
    <div>
      Not found
    </div>
  );
};

export default NotFound;