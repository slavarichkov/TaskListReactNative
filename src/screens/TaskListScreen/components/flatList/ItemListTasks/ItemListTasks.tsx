import React, { FC, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import FormTwoTextButton from '../../../../../commonComponents/forms/FormTwoTextButton';
import { animateLayout } from '../../../../../utils/animation';
import { IItemListTasks } from './types';
import OptionsItem from './components/OptionsItem/OptionsItem';
import InfoItem from './components/InfoItem/InfoItem';
import ControlButtons from './components/ControlButtons/ControlButtons';

/** Компонент - карточки задачи */
const ItemListTasks: FC<IItemListTasks> = ({
  item,
  colorText,
  handleClickUpdate,
  handleClickRemove,
  handleClickDone,
}) => {
  // Формы
  const [isOpenedFormRemove, setIsOpenedFormRemove] = useState<boolean>(false);

  function openFormRemove() {
    animateLayout();
    setIsOpenedFormRemove(true);
  }

  function closeFormRemove() {
    animateLayout();
    setIsOpenedFormRemove(false);
  }

  function toggle() {
    if (item) {
      const updatedObj = {
        _id: item._id,
        author: item.author,
        isDone: !item.isDone,
      }
      handleClickDone(updatedObj);
    }
  }

  return (
    <View style={styles.container}>
      <OptionsItem item={item} colorText={colorText} toggle={toggle} />
      <InfoItem item={item} colorText={colorText} />
      {!isOpenedFormRemove && (
        <ControlButtons update={() => handleClickUpdate(item)} openFormRemove={openFormRemove} />
      )}
      {isOpenedFormRemove ? (
        <FormTwoTextButton
          text="Удалить объявление"
          textButtonOne="Да"
          textButtonTwo="Нет"
          onClickOne={()=>handleClickRemove(item._id)}
          onClickTwo={closeFormRemove}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const width = Dimensions.get('window').width * 0.95;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    padding: 17,
    width: width,
    maxWidth: 500,
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textImportant: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default ItemListTasks;
