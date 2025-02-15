import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enrolledCourses: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      if (!state.enrolledCourses.find(course => course.id === action.payload.id)) {
        state.enrolledCourses.push({
          ...action.payload,
          progress: 0,
          completedModules: [],
        });
      }
    },
    updateModuleCompletion: (state, action) => {
      const { courseId, weekNumber } = action.payload;
      const course = state.enrolledCourses.find(c => c.id === courseId);
      if (course) {
        if (!course.completedModules) {
          course.completedModules = [];
        }
        if (!course.completedModules.includes(weekNumber)) {
          course.completedModules.push(weekNumber);
          course.completedModules.sort((a, b) => a - b);
        }
      }
    },
  },
});

export const { enrollCourse, updateModuleCompletion } = userSlice.actions;
export default userSlice.reducer;