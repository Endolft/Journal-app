import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";


import { deleteImagebyUrl } from "../../store/journal/thunks";

export const ImageGallery = () => {
  const { active } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const { temporalImages = [], imageUrls = [] } = active;

  const deleteImage = (event) => {
    const temporalImagesCut = temporalImages.filter((img) => img !== event);
    const urlsImagesCut = imageUrls.filter((img) => img !== event);

    if (event.includes("blob:")) {
      dispatch(deleteImagebyUrl(temporalImagesCut));
      return;
    }
    dispatch(deleteImagebyUrl(urlsImagesCut));
  };

  const imageSx = {
    display: "flex",
    alignItems: "center",
    opacity: 0,
    height: "inherit",
    backgroundColor: "#7e7d7d",
    width: "100%",
    justifyContent: "center",
    "&:hover": {
      border: "5px solid black",
      opacity: 0.7,
    },
  };

  return (
    <ImageList
      sx={{ height: "100%" /* backgroundColor: "green" */ }}
      cols={4}
      rowHeight={400}
    >
      {[...imageUrls, ...temporalImages].map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}`}
            alt={"imagen de la nota"}
            loading="lazy"
            height="100%"
          />

          <Grid
            container
            sx={{
              height: "inherit",
              position: "absolute",
              width: "100%",
            }}
            key={image}
          >
            <Grid item sx={imageSx}>
              <img
                src="https://www.seekpng.com/png/full/202-2022743_edit-delete-icon-png-download-delete-icon-png.png"
                style={{ width: "20% ", height: "20%", cursor: "pointer" }}
                onClick={() => deleteImage(image)}
              ></img>
            </Grid>
          </Grid>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
