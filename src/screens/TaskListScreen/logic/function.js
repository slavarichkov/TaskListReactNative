import apiTask from "../../../services/apiTask";
import { getDeviceId } from "../../../utils/asyncStoreFunctions";

async function getTasksFromServer() {
    const deviceId = await getDeviceId();
    const tasksArray = await apiTask.getTasks(deviceId);
    return tasksArray;
}

function getUpdatedTasks(tasks, updatedTask) {
    const updatedTasks = tasks.map(task => {
        if (task._id.toString() === updatedTask.task._id.toString()) {
            return updatedTask.task;
        } else {
            return task;
        }
    });

    return updatedTasks;
}

export { getTasksFromServer, getUpdatedTasks }