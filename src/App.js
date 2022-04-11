import React, { useEffect, useState } from "react";
import StockPhotos from "./components/StockPhotos";
import Pagination from "@mui/material/Pagination";
import logo from "./logo.svg";
import { useGlobalContext } from "./context";
import paginate from "./utils";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const { isLoading, photos, handleChange, allAlbumId, albumId } =
    useGlobalContext();
  const estimatedItemsPerPage = 100;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState("");
  const [photosPerPage, setPhotosPerPage] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  useEffect(() => {
    if (isLoading === true) return;
    setData(paginate(photos));
    setPages(Math.ceil(photos.length / estimatedItemsPerPage));
  }, [photos]);

  useEffect(() => {
    setPhotosPerPage(data[page]);
  }, [data, page]);

  const onPageChange = (e) => {
    e.target.type === "button"
      ? setPage(parseInt(e.target.ariaLabel.match(/\d+/)) - 1)
      : changePage(e);
  };

  const changePage = (e) => {
    e.target.dataset.testid === "NavigateNextIcon" &&
      setPage((oldPage) => {
        let nextPage = oldPage + 1;
        if (nextPage > data.length - 1) {
          nextPage = 0;
        }
        return nextPage;
      });
    e.target.dataset.testid === "NavigateBeforeIcon" &&
      setPage((oldPage) => {
        let nextPage = oldPage - 1;
        if (nextPage > data.length - 1) {
          nextPage = 0;
        }
        return nextPage;
      });
  };

  const selectionHandler = (id) => {
    setSelectedAlbumId(id);
    handleChange(id);
  };

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <div>
      <h1 className="title">Photo album</h1>
      <Box sx={{ maxWidth: 180 }} className="centeredSelection">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Album Id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={albumId}
            label="AlbumId"
          >
            {allAlbumId.map((id, index) => (
              <MenuItem
                key={index}
                value={id}
                onClick={() => selectionHandler(id)}
              >
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className="cont">
        {photosPerPage?.map((photo) => {
          return <StockPhotos key={photo.id} {...photo} />;
        })}
      </div>
      {photos.length > 0 && (
        <Pagination
          count={pages}
          onChange={onPageChange}
          variant="outlined"
          color="primary"
          className="centeredPagination"
        />
      )}
    </div>
  );
}

export default App;
