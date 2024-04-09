import { RootState } from '../../store'; 

// Селектор для извлечения всех задач
export const selectAllTasks = (state: RootState) => state.tasks.tasks;