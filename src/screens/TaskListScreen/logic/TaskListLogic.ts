import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { TaskType } from '../../../models/TaskModel';
import apiTask from '../../../services/api';
import { getDeviceId } from '../../../utils/asyncStoreFunctions';
import { sortByDateAscending } from '../../../utils/functions';
import { getTasksFromServer, getUpdatedTasks } from './function';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setTasks, // зписать массив
  addTask, // добавить задачу в список
  removeTask, // удалить задачу из списка
  updateTask, // обновит задачу
  setShowingTasks, // Наполнить отображаемые задачи
} from '../../../redux/slices/tasks/taskSlice';

export const useTaskLogic = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isOpenededFormAddTasks, setOpenedFormAddTasks] = useState<boolean>(false); // Формы
  const [updatingItem, setUpdatingItem] = useState<TaskType | undefined>();
  const [isLoading, setLoading] = useState<"isSubmitLoading" | "isInitLoading" | "isRefreshing" | false>(false); // Лоадеры
  const [isImportantTasks, setImportantTasks] = useState<boolean>(false); // Фильтр

  /** Создать задачу */
  async function createTasks(data: TaskType) {
    try {
      setLoading("isSubmitLoading");
      const deviceId = await getDeviceId();
      data.author = deviceId;
      const newTask = await apiTask.createTask(data);
      dispatch(addTask(newTask.task));
      setLoading(false)
      closeFormAddOrUpdateTasks();
    } catch (error) {
      console.log(error)
      setLoading(false);
      Alert.alert('Ошибка на сервере', 'Не удалось добавить задачу, попробуйте позже');
    }
  }

  /** Удаление задачи */
  async function handleCkickRemove(id: string) {
    try {
      const deviceId = await getDeviceId();
      await apiTask.removeTask(deviceId, id);
      dispatch(removeTask(id));
    } catch (err) {
      console.log(err);
    }
  }

  /** Обновить задачу */
  async function updateTasks(data: TaskType) {
    try {
      if (updatingItem) {
        setLoading("isSubmitLoading")
        const deviceId = await getDeviceId();
        data.author = deviceId;
        data._id = updatingItem._id;
        const updatedTask = await apiTask.updateTask(data);
        dispatch(updateTask(updatedTask.task));
        setLoading(false);
        closeFormAddOrUpdateTasks();
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Ошибка', 'Не удалось добавить задачу, попробуйте позже');
    }
  }

  /** Отметить задачу как выполненную */
  async function handleCkickDone(selectedTask: TaskType) {
    try {
      setLoading("isSubmitLoading")
      const updatedTask = await apiTask.updateTask(selectedTask);
      const updatedTasks = getUpdatedTasks(tasks, updatedTask)
      dispatch(setTasks(updatedTasks))
      setLoading(false);
      closeFormAddOrUpdateTasks();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Ошибка', 'Не удалось отредактировать задачу, попробуйте позже');
    }
  }

  function controlFiltrerImportant() {
    setImportantTasks(!isImportantTasks);
  }

  // Получить список задач
  async function getTasksUser() {
    try {
      setLoading("isInitLoading")
      const tasksArray = await getTasksFromServer();
      dispatch(setTasks(tasksArray.tasks));
      setTasks(tasksArray.tasks);
      setLoading(false);
    } catch {
      Alert.alert('Ошибка', 'Не удалось получить список задач с сервера, попробуйте позже');
      setLoading(false);
    }
  }

  /** Обновить список задач с сервера */
  async function fetchTasks() {
    try {
      setLoading("isRefreshing");
      const tasksArray = await getTasksFromServer();
      setTasks(tasksArray.tasks);
      setLoading(false);
    } catch {
      Alert.alert('Ошибка', 'Не удалось получить список задач с сервера, попробуйте позже');
      setLoading(false);
    }
  }

  // Управление открытием и закрытием
  function openFormUpdateOrAddTasks() {
    setOpenedFormAddTasks(true);
  }

  /** Свернуть форму */
  function closeFormAddOrUpdateTasks() {
    setOpenedFormAddTasks(false);
    setUpdatingItem(undefined);
  }

  /** Клик на открытие формы редактирования */
  function handleClickUpdate(item: TaskType) {
    setUpdatingItem(item);
    openFormUpdateOrAddTasks();
  }

  useEffect(() => {
    getTasksUser();
  }, []);

  useEffect(() => {
    if (tasks) {
      let array = sortByDateAscending(tasks);
      if (isImportantTasks) {
        array = array.filter((item: TaskType) => {
          return item.isImportant.toString() === 'true';
        });
      }
      dispatch(setShowingTasks(array));
    }
  }, [isImportantTasks, tasks]);

  return {
    isOpenededFormAddTasks,
    updatingItem,
    isImportantTasks,
    isLoading,
    handleClickUpdate,
    handleCkickRemove,
    openFormUpdateOrAddTasks,
    closeFormAddOrUpdateTasks,
    createTasks,
    updateTasks,
    handleCkickDone,
    controlFiltrerImportant,
    fetchTasks,
  };
};
