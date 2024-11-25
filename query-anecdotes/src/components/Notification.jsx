
import  {useNotification } from './useNotification'

const Notification = () => {
  const { state } = useNotification();

  if (!state.visible) {
    return null; // Don't render anything if there's no notification to show
  }

  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: state.type === 'success' ? 'green' : 'red', 
      color: 'white', 
      borderRadius: '5px' 
    }}>
      {state.message}
    </div>
  );
};

export default Notification;
