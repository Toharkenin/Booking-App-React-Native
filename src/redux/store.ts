import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
// import dateReducer from './reducers/dateSlice';
// import appointmentReducer from './reducers/appointmentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

