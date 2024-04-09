import { FC } from "react";
import { StyleSheet, View } from "react-native"
import { IControlButtons } from "./types";
import ButtonImage from "../../../../../../../components/commonComponents/buttons/ButtonImage";
import imgUpdate from '../../../../../../../assets/images/edit-2-svgrepo-com.png';
import imgRemove from '../../../../../../../assets/images/trash-basket-svgrepo-com.png';

/** Компонент с кнопками управления карточкой */
const ControlButtons: FC<IControlButtons> = ({ update, openFormRemove }) => {
    return (
        <View style={styles.containerButton}>
            <ButtonImage
                URLImg={imgRemove}
                onPress={openFormRemove}
                style={{ width: 20, height: 20 }}
            />
            <ButtonImage
                URLImg={imgUpdate}
                onPress={update}
                style={{ width: 20, height: 20 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        paddingTop: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default ControlButtons;