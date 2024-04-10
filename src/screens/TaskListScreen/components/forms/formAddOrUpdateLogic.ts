import { useState, useEffect, useRef } from 'react';
import { regexStrokeInput } from '../../../../utils/regex';
import { IDataSubmit, Props } from './types';

const useFormAddOrUpdateLogic = ({ handleSubmitAdd, handleSubmitUpdate, updatingTask }: Props) => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskText, setTaskText] = useState<string>('');
  const [isImportant, setTaskImportant] = useState<boolean>(false);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [messageValidation, setMessageValidation] = useState<string>('');

  function onSubmitForm() {
    if (isValidForm) {
      if (updatingTask) {
        let updatedObj: IDataSubmit = { };
        if (taskName !== updatingTask.name) {
          updatedObj.name = taskName;
        }
        if (taskText !== updatingTask.text) {
          updatedObj.text = taskText;
        }
        if (isImportant !== updatingTask.isImportant) {
          updatedObj.isImportant = isImportant;
        }
        handleSubmitUpdate(updatedObj);
      } else {
        const taskObj: IDataSubmit = {
          name: taskName,
          text: taskText,
          isImportant,
          isDone: false,
          date: '', // Введите здесь дату, если это необходимо
        };
        handleSubmitAdd(taskObj);
      }
    }
  }

  // Наполнить форму при обновлении updatingTask
  useEffect(() => {
    if (updatingTask) {
      setTaskName(updatingTask.name);
      setTaskText(updatingTask.text);
      setTaskImportant(updatingTask.isImportant);
    }
  }, [updatingTask]);

  // Валидация формы
  useEffect(() => {
    const isValidName = taskName !== '' && regexStrokeInput.test(taskName);
    const isValidText = taskText !== '' && regexStrokeInput.test(taskName);

    const isValidUpdate =
      updatingTask &&
      taskName === updatingTask.name &&
      taskText === updatingTask.text &&
      updatingTask.isImportant.toString() === isImportant.toString();

    if (isValidName && isValidText && (updatingTask ? !isValidUpdate : true)) {
      setIsValidForm(true);
      setMessageValidation('');
    } else {
      setIsValidForm(false);
      setMessageValidation(
        isValidUpdate
          ? 'Внесите изменения для редактирования'
          : 'Пропущено поле или указан недопустимый символ',
      );
    }
  }, [taskName, taskText, isImportant, updatingTask]);

  // Управление инпутами с клавиатуры
  let inputNameRef = useRef(null);
  let inputTextRef = useRef(null);

  const handleInputName = () => {
    // Фокусировка на следующем TextInput
    if (inputNameRef && inputTextRef) {
      inputTextRef.current.focus();
    }
  };

  return {
    taskName,
    setTaskName,
    taskText,
    setTaskText,
    isImportant,
    setTaskImportant,
    isValidForm,
    messageValidation,
    onSubmitForm,
    inputNameRef,
    inputTextRef,
    handleInputName,
  };
};

export default useFormAddOrUpdateLogic;
