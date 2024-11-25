import PropTypes from 'prop-types';
import { createContext, useReducer, useContext } from 'react';

// Define action types
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

// Define the initial state of the notification
const initialState = {
  message: '',
  type: '', // Can be 'success' or 'error'
  visible: false,
};

// Reducer function to manage notification state
const notificationReducer = (state, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { message: action.payload.message, type: action.payload.type, visible: true };
    case HIDE_NOTIFICATION:
      return { ...state, visible: false };
    default:
      return state;
  }
};

// Create Notification Context
const NotificationContext = createContext();

// Notification Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  
  const showNotification = (message, type = 'success') => {
    dispatch({ type: SHOW_NOTIFICATION, payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: HIDE_NOTIFICATION });
    }, 5000); 
  };

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
