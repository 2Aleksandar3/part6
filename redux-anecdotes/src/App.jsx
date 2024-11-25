import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]);

  return (
    <div>
    <Notification/>
    <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList /> {/* Render the AnecdoteList component */}
      <AnecdoteForm /> {/* Render the AnecdoteForm component */}
    </div>
  )
}

export default App