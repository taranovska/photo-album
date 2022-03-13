import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_PHOTOS,
  REMOVE_PHOTO,
  HANDLE_CHANGE,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "http://jsonplaceholder.typicode.com/photos";

const initialState = {
  isLoading: true,
  photos: [],
  albumId: "",
  allAlbumId: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllPhotos = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_PHOTOS,
        payload: { photos: data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removePhoto = (id) => {
    dispatch({ type: REMOVE_PHOTO, payload: id });
  };
  
  const handleChange = (id) => {
    dispatch({ type: HANDLE_CHANGE, payload: id });
  };

  useEffect(() => {
    fetchAllPhotos(`${API_ENDPOINT}`);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, removePhoto, handleChange }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
