import { LayoutAnimation } from "react-native";

function animateLayout() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export { animateLayout };