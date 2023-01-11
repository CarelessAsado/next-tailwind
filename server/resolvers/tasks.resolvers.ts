import { Resolver, Query, Arg } from "type-graphql";
import { Task, TaskModel } from "server/schemas/Task.schema";

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return TaskModel.find({});
  }

  @Query(() => Task)
  async task(@Arg("taskID") taskID: string): Promise<Task> {
    const task = await TaskModel.findById(taskID);
    if (!task) {
      throw new Error("Invalid task ID");
    }
    return task;
  }
}
