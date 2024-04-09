import React, { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Form from '../../../../commonComponents/forms/Form';
import TextInputWithLabelInside from '../../../../commonComponents/Inputs/TextInputWithLableAndValidation';
import Checkbox from '../../../../commonComponents/checkboxs/Checkbox';
import useFormAddOrUpdateLogic from './formAddOrUpdateLogic';
import { IFormAddOrUpdateLogic } from './types';

const FormAddOrUpdate: FC<IFormAddOrUpdateLogic> = ({
  isVisible,
  isSubmitLoading,
  handleSubmitAdd,
  handleSubmitUpdate,
  handleCloseForm,
  updatingTask,
}) => {

  const {
    taskName,
    taskText,
    isImportant,
    isValidForm,
    messageValidation,
    setTaskName,
    setTaskText,
    setTaskImportant,
    onSubmitForm,
    inputNameRef,
    inputTextRef,
    handleInputName,
  } = useFormAddOrUpdateLogic({ handleSubmitAdd, handleSubmitUpdate, updatingTask });

  return (
    <View>
      <Form
        textSubmit={updatingTask ? 'Редактировать' : 'Создать'}
        nameForm={updatingTask ? 'Редактировать задачу' : 'Новая задача'}
        isFormValid={isValidForm}
        sumbit={onSubmitForm}
        isSubmitLoading={isSubmitLoading}
        onCloseForm={handleCloseForm}
        isVisible={isVisible}
        messageValidation={messageValidation}
        child={
          <View style={styles.container}>
            <TextInputWithLabelInside
              placeholder={'Введите название'}
              label="Название"
              value={taskName}
              onChangeText={setTaskName}
              maxLength={100}
              forwardedRef={inputNameRef}
              returnKeyType={'next'}
              handleInputSubmit={handleInputName}
            />
            <TextInputWithLabelInside
              placeholder={'Введите текст'}
              label="Текст"
              value={taskText}
              onChangeText={setTaskText}
              maxLength={1000}
              multiline={true}
              forwardedRef={inputTextRef}
              handleInputSubmit={onSubmitForm}
            />
            <View style={styles.checkBox}>
              <Checkbox
                text={'Отметить как важную'}
                isChecked={isImportant}
                setChecked={setTaskImportant}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  checkBox: {
    width: '100%',
    paddingTop: 17,
  },
});

export default FormAddOrUpdate;
