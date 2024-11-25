import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';  // Update with your server URL

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((response) => response.data);
};


export const createAnecdote = (newAnecdote) => {
    return axios.post(baseUrl, newAnecdote).then((response) => response.data);
  };


  export const voteAnecdote = async (updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
    return response.data;
  };