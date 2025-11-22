import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const sendMessage = async (username, message) => {
  try {
    const response = await api.post('/messages/', {
      username,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

export const getMessages = async (username) => {
  try {
    const response = await api.get(`/messages/?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    throw error;
  }
};


export default api;