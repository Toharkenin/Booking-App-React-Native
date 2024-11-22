import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import Appointments from '../screens/Appointments';
// import dateReducer from './reducers/dateSlice';
import appointmentReducer from './reducers/appointmentSlice';
import { combineReducers } from 'redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    Appointment: appointmentReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  appts: appointmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

