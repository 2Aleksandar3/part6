import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createAnecdote, voteAnecdote } from './request';
import { useNotification } from './components/useNotification';
import Notification from './components/Notification';

const App = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch anecdotes
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  // Mutation for creating a new anecdote
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      setNewAnecdote('');
      showNotification(`Anecdote "${createdAnecdote.content}" has been created!`, 'success');
    },
    onError: (error) => {
      // Handle any error that may occur during the mutation
      showNotification(error.message, 'error');
    },
  });

  // Mutation for voting (updating votes)
  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']); // Invalidate the query to refetch
      showNotification(`Anecdote "${updatedAnecdote.content}" has been liked!`, 'success');
    },
  });

  // Handle voting for an anecdote
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1, // Increment the vote count
    });
  };

  // Handle form submission for creating a new anecdote
  const handleNewAnecdoteSubmit = (event) => {
    event.preventDefault();
    if (newAnecdote.trim().length >= 5) {
      createAnecdoteMutation.mutate({ content: newAnecdote, votes: 0 });
    } else {
      showNotification('Anecdote must be at least 5 characters long', 'error');
    }
  };

  // Loading and error states
  if (result.isLoading) return <div>Loading anecdotes...</div>;
  if (result.isError) return <div>Error loading anecdotes.</div>;

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>

      <h2>Create a new anecdote</h2>
      <form onSubmit={handleNewAnecdoteSubmit}>
        <input
          type="text"
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content} has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </p>
        </div>
      ))}
      
    </div>
  );
};

export default App;
