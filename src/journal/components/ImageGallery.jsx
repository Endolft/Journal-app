import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";

export const ImageGallery = () => {
  const { active } = useSelector((state) => state.journal);

  const { temporalImages=[], imageUrls=[] } = active;

  return  temporalImages.length > 0 ? 
      <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
        {temporalImages.map((image) => (
          <ImageListItem key={image}>
            <img
              src={`${image}`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"imagen de la nota"}
              loading="lazy"
            />
            <input type={"checkbox"} />
          </ImageListItem>
        ))}
      </ImageList>
     : 
      <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
        {imageUrls.map((image) => (
          <ImageListItem key={image}>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={"imagen de la nota"}
              loading="lazy"
            />
            <input type={"checkbox"} />
          </ImageListItem>
        ))}
      </ImageList>

};
