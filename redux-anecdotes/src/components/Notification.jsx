import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none',  // Only display if there's a message
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification