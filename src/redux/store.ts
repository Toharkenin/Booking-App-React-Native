import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import dateReducer from './reducers/dateSlice';
import appointmentReducer from './reducers/appointmentSlice';
import { combineReducers } from 'redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
    date: dateReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  appointment: appointmentReducer,
  date: dateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

