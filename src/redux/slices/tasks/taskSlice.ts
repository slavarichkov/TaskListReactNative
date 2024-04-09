import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../../../models/TaskModel';

interface ITasksState {
  tasks: TaskType[];
  showingTasks: TaskType[];
}

// Начальное состояние
const initialState: ITasksState = {
  tasks: [], // общий список задач
  showingTasks: [], // отображаемые задачи в зависимости от фильтра важности
};

// для управления задачами
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     /** Наполнить задачи */
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<ITasksState>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const updatedTaskIndex = state.tasks.findIndex(task => task._id === action.payload._id);
      if (updatedTaskIndex !== -1) {
        state.tasks[updatedTaskIndex] = action.payload;
      }
      const updatedTaskIndexST = state.showingTasks.findIndex(task => task._id === action.payload._id);
      if (updatedTaskIndex !== -1) {
        state.showingTasks[updatedTaskIndexST] = action.payload;
      }
    },
    /** Наполнить отображаемые задачи */
    setShowingTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.showingTasks = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  updateTask, 
  // Отображаемые задачи
  setShowingTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
