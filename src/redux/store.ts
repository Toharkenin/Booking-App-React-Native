import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import Appointments from '../screens/Appointments';
// import dateReducer from './reducers/dateSlice';
import appointmentReducer from './reducers/appointmentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    Appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

