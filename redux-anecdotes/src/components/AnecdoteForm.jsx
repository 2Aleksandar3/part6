import { useDispatch } from 'react-redux'

import { setNotificationWithTimeout } from '../reducers/notificationReducer';

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.trim() !== '') {
      dispatch(createAnecdote(content))
      dispatch(setNotificationWithTimeout( `New anecdote added: '${content}'`,  5 ));
    } else {
      alert('Anecdote cannot be empty')
    }
    event.target.anecdote.value = '' // Clear input field
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm