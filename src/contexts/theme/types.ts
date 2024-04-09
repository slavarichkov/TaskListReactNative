import { TextStyle } from "react-native";

export interface ITheme {
    theme: 'light' | 'dark';
    colorText: TextStyle;
    backgroundColor: { backgroundColor: string };
    changeTheme: (theme: 'light' | 'dark') => void;
}