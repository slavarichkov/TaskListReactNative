import { FC } from "react";
import { StyleSheet, Text } from "react-native"
import { IInfoItem } from "./types";

/** Компонент с именем и текстом задачи */
const InfoItem: FC<IInfoItem> = ({ item, colorText, }) => {
    return (
        <>
            <Text style={[styles.title, colorText]}>{item.name}</Text>
            <Text style={[styles.text, colorText]}>{item.text}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        paddingTop: 17,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    text: {
        paddingTop: 12,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },
});

export default InfoItem;