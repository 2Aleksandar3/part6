import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout} from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes) // Get the anecdotes from the store
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  // Handle voting for an anecdote
  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    if (anecdote) {
      // Dispatch the vote action for the selected anecdote
      dispatch(voteAnecdote(anecdote))

      // Dispatch the notification with the liked anecdote's content
      dispatch(setNotificationWithTimeout(`You liked: "${anecdote.content}"`,  5 ));
    }
  }


  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  // Sort anecdotes by number of votes in descending order
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  


  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList