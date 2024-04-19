import axios from 'axios';

export const postFileToAPI = async (file : File ) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post("http://localhost:3333/api/upload", formData);
    return response;
  } catch (error) {
    console.error("Erro:", error);
  }
};