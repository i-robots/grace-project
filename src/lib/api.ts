import axios from 'axios';

export const uploadImageToImgBB = async (imageFile: string | Blob) => {
  const apiKey = '446c37b2691e3c9819d636552319bd35'; 
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', imageFile);

  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', formData);
    console.log('Image URL:', response.data.data.url);
    return response
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const saveObject = async (payload: Object) => {
  try {
    const response = await axios.post('https://grpc-api.vercel.app/api/saveObject', payload)
    return response
  } catch (e) {
    console.error('Error: ', e)
  }
}

export const updateObject = async (id: string, payload: Object) => {
  try {
    const response = await axios.put(`https://grpc-api.vercel.app/articles/update/${id}`, payload)
    return response
  } catch (e) {
    console.log(e)
  }
}

export const fetchArticle = async () => {
  try {
    const response = await axios.get('https://grpc-api.vercel.app/articles')
    return response
  } catch (e) {
    console.log(e)
  }
}

export const fetchArticleId = async (id: string) => {
  try {
    const response = await axios.get(`https://grpc-api.vercel.app/articles/by-id/${id}`)
    return response
  } catch (e) {
    console.log(e)
  }
}

export const fetchPlaylist = async (playlistId: string) => {
  try {
    const response = await axios.get(`https://grpc-api.vercel.app/api/playlistVideos/${playlistId}`)
    return response
  } catch(e) {
    console.log(e)
  }
}
 
// BY Title
// https://grpc-api.vercel.app/articles/by-title/:title
