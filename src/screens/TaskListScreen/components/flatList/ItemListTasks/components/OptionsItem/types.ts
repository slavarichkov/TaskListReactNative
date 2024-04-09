import { TextStyle } from "react-native";
import { TaskType } from "../../../../../../../models/TaskModel";

export interface IOptionsItem {
    item: TaskType,
    colorText: TextStyle,
    toggle: () => void
}