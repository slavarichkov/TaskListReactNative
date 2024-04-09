import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../../../components/commonComponents/buttons/Button';
import Filter from './components/Filter';

interface Props {
  openForm: () => void;
  isFiltredImportants: boolean;
  setIsFiltredImportants: () => void;
}

/** Компонент - кнопка добавить и фильтр */
const HeaderListTasks: FC<Props> = ({
  openForm,
  isFiltredImportants,
  setIsFiltredImportants,
}) => {
  return (
    <View style={styles.container}>
      <Button text={'Добавить'} onClick={openForm} />
      <Filter
        isActiveFilter={isFiltredImportants}
        setIsActiveFilter={setIsFiltredImportants}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
  },
});

export default HeaderListTasks;
