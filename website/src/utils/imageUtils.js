import { imageCache } from "../components/CupomCard";

export const fetchImage = async (imageURL, setImage) => {
  try {
    // Verifica se a imagem já está em cache
    if (imageCache[imageURL]) {
      setImage(imageCache[imageURL]);
      return;
    }

    let pathAfterMedia = '';

    if (imageURL.includes('profile_images')) {
      pathAfterMedia = imageURL.substring(imageURL.indexOf('profile_images'));
    } else if (imageURL.includes('event_images')) {
      pathAfterMedia = imageURL.substring(imageURL.indexOf('event_images'));
    } else if (imageURL.includes('pet_images')) {
      pathAfterMedia = imageURL.substring(imageURL.indexOf('pet_images'));
    } else if (imageURL.includes('cupom_images')) {
      pathAfterMedia = imageURL.substring(imageURL.indexOf('cupom_images'));
    }
    const apiUrl = process.env.REACT_APP_API_URL.replace('api', '');
    const url = apiUrl + 'media/' + pathAfterMedia;

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