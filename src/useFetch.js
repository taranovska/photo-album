import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "http://jsonplaceholder.typicode.com/photos";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const getPhotos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(paginate(data));
    setLoading(false);
  };
  const getAllPhotos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setAllData(data);
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
    getAllPhotos();
  }, []);
  return { loading, data, allData };
};
