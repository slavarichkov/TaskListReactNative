import { FC } from "react";
import { Image, ImageSourcePropType } from "react-native";

interface Props {
    imgSource: ImageSourcePropType;
    color: string;
}

const TabBarIcon: FC<Props> = ({ imgSource, color }) => {
    return (
        <Image
            source={imgSource}
            style={{ width: 29, height: 29, tintColor: color }}
        />
    );
};

export default TabBarIcon;