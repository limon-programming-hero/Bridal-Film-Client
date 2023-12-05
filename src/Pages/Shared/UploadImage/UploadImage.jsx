import axios from "axios";

const UploadImage = async (imageFile) => {
  //imgbb link with api key
  const imageLink = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_ImageBB_api_key
  }`;

  const formData = new FormData();
  formData.append("image", imageFile[0]);
  const imageData = await axios
    .post(imageLink, formData)
    .then((res) => res?.data?.data);
  return imageData;
};

export default UploadImage;
