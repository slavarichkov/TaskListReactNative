import { TextStyle } from "react-native";
import { TaskType } from "../../../../../models/TaskModel";

export interface IItemListTasks {
    item: TaskType;
    colorText: TextStyle;
    handleClickUpdate: (data: TaskType) => void;
    handleClickRemove: (id: string) => void;
    handleClickDone: (data: TaskType, state: boolean) => void;
}