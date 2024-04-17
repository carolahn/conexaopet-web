import { imageCache } from "../components/CupomCard";

export const fetchImage = async (imageURL, setImage) => {
  try {
    // Verifica se a imagem já está em cache
    if (imageCache[imageURL]) {
      setImage(imageCache[imageURL]);
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
    const pathAfterMedia = imageURL.substring(imageURL.indexOf('media/'));
    const url = apiUrl + pathAfterMedia;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${url}`);
    }
    const blob = await response.blob();
    const file = new File([blob], imageURL.substring(imageURL.lastIndexOf('/') + 1));

    // Salva a imagem no cache
    imageCache[imageURL] = URL.createObjectURL(file);
    setImage(imageCache[imageURL]);
  } catch (error) {
    console.error(`Error fetching image from ${imageURL}:`, error);
  }
};