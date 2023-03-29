import { savePhoto } from "../store/journal/journalSlice";
import { fileUpload } from "./fileUpload";

export const saveImages = async ({ dispatch = () => {}, files = [] }) => {
  const fileUploadPromises = [];
  for (const file of files) {
    fileUploadPromises.push(fileUpload(file));
  }
  const photosUrls = await Promise.all(fileUploadPromises);

  dispatch(savePhoto(photosUrls));
};
