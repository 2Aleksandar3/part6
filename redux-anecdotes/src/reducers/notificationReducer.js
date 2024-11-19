import { createSlice } from '@reduxjs/toolkit';

// Create the slice for notifications
const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '', // Initial state of the notification message
  },
  reducers: {
    // Action to set a new notification message
    setNotification(state, action) {
      state.message = action.payload;
    },
    // Action to clear the notification message manually
    clearNotification(state) {
      state.message = '';
    },
  },
});

// New action that sets a notification with a duration and clears it after the timeout
export const setNotificationWithTimeout = (message, durationInSeconds) => {
  return (dispatch) => {
    // Set the notification message
    dispatch(setNotification(message));

    // Clear the notification after the given duration
    setTimeout(() => {
      dispatch(clearNotification());
    }, durationInSeconds * 1000); // Convert seconds to milliseconds
  };
};

// Export the actions
export const { setNotification, clearNotification } = notificationSlice.actions;

// Export the reducer to use in the store
export default notificationSlice.reducer;