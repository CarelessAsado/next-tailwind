import { BACKEND_URL_API, BACKEND_ROUTER } from "constants/constants";
import axios from "axios";
import { Task } from "client/generated/graphql";

export function updateTask(task: Task) {
  return axios.put<Task>(
    BACKEND_URL_API + BACKEND_ROUTER.tasksControllerAPI,
    task
  );
}
