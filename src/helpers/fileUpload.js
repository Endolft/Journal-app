import React from "react";

export const fileUpload = async (file) => {
  if (!file) throw new Error("no tenemos ningun archivos a subir");

  const cloudUrl = "https://api.cloudinary.com/v1_1/doz9dkmem/upload";
  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, { method: "POST", body: formData });

    if (!resp.ok) throw new Error("no se pudo subir imagen");
    const cloudResp = await resp.json();
    console.log('aca dentro tambien')
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
  }
};
