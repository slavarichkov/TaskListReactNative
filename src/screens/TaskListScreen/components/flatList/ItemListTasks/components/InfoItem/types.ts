import { TextStyle } from "react-native";
import { TaskType } from "../../../../../../../models/TaskModel";

export interface IInfoItem {
    item: TaskType,
    colorText: TextStyle,
}