// Contexts.js
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
export const Context = createContext();

export const CountProvider = ({ children }) => {

  const [Count, setCount] = useState(() => {

    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? JSON.parse(savedCount) : 0;

  });

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(Count));
  }, [Count]);

  const[preview,setPreview] = React.useState(false)
  const [isSubmit,setIsSubmit] = React.useState(false)
  const[assetDetails,setAssetDetails] = React.useState([])
  const[count, setcount] = useState();

  return (
    <Context.Provider value={{ Count, setCount ,count, setcount, preview, setPreview, isSubmit, setIsSubmit, assetDetails,setAssetDetails }}>
      {children}
    </Context.Provider>
  );
};
