import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, styled } from "@mui/material";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalContext } from "../context";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const StockPhotos = (props) => {
  const { ...photo } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { removePhoto } = useGlobalContext();

  return (
    <div className={photo.id}>
      <Card sx={{ maxWidth: 150 }} className="space">
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={photo.thumbnailUrl}
            alt="stock photo"
            onClick={handleOpen}
          />
          <ClearIcon
            color="secondary"
            className="clearIcon"
            onClick={() => removePhoto(photo.id)}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {photo.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <Box className="enlargedView">
            <img src={photo.url} alt="enlarged view"></img>
            <ClearIcon
              color="secondary"
              className="closeIcon"
              onClick={handleClose}
            />
          </Box>
        </StyledModal>
      </div>
    </div>
  );
};

export default StockPhotos;
