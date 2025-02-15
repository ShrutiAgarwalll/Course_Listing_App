import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
  },
});