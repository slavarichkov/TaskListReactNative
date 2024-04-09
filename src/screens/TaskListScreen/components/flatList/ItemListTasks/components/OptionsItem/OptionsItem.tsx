import { StyleSheet, Text, View } from "react-native";
import Checkbox from "../../../../../../../commonComponents/checkboxs/Checkbox";
import { FC } from "react";
import { IOptionsItem } from "./types";

/** Компонент Инф о важности и выполненности задачи */
const OptionsItem: FC<IOptionsItem> = ({ item, colorText, toggle }) => {
  return (
    <View style={styles.containerTop}>
      <Text style={[styles.textImportant, colorText]}>
        {item.isImportant ? 'Важная' : 'Не важная'}
      </Text>
      <Checkbox text={'Выполнено'} isChecked={item.isDone} setChecked={toggle} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textImportant: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default OptionsItem;