import { TaskType } from "../../../../models/TaskModel";

export interface IDataSubmit {
    name: string;
    text: string;
    isImportant: boolean;
    date: string;
    isDone?: boolean;
  }

  export interface Props {
    handleSubmitAdd: (data: IDataSubmit) => void;
    handleSubmitUpdate: (data: IDataSubmit) => void;
    updatingTask?: TaskType;
  }
  
  export interface IFormAddOrUpdateLogic {
    isVisible: boolean;
    isSubmitLoading?: boolean;
    handleSubmitAdd: (data: IDataSubmit) => void;
    handleSubmitUpdate: (data: IDataSubmit) => void;
    handleCloseForm: () => void;
    updatingTask?: TaskType;
  }