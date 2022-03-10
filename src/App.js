import React, { useEffect, useState } from "react";
import StockPhotos from "./components/StockPhotos";
import Pagination from "@mui/material/Pagination";
import logo from "./logo.svg";
import { useFetch } from "./useFetch";

function App() {
  const { loading, data, allData } = useFetch();
  console.log(data);
  const [page, setPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    if (loading) return;
    setPhotos(data[page]);
  }, [loading, page]);

  const onPageChange = (e) => {
    e.target === "button"
      ? setPage(parseInt(e.target.ariaLabel.match(/\d+/)))
      : changePage();
  };

  const changePage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const onChange = (id) => {
    console.log("delete image");
    console.log(id);
  };

  const itemsPerPage = 100;
  return (
    <div>
      <h1 className="title">Photo album</h1>
      <div className="cont">
        {photos.map((photo) => {
          return <StockPhotos key={photo.id} {...photo} onChange={onChange} />;
        })}
      </div>
      <Pagination
        count={allData.length / itemsPerPage}
        onChange={onPageChange}
        variant="outlined"
        color="primary"
        className="centeredPagination"
      />
    </div>
  );
}

export default App;
