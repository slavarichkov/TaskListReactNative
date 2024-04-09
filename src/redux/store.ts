import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './slices/theme/themeSlice';
import tasksReducer from './slices/tasks/taskSlice';

export default configureStore({
  reducer: {
    theme: themeReducer,
    tasks: tasksReducer,
  }
})

// export type RootReduxState = ReturnType<typeof store.getState>;