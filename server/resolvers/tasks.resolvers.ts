import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Task, TaskModel } from "server/schemas/Task.schema";

@InputType()
class NewTaskInput implements Partial<Task> {
  @Field()
  value!: string;
}

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

  @Mutation(() => Task)
  async createTask(
    @Arg("newTaskINPUT") newTaskINPUT: NewTaskInput
  ): Promise<Task> {
    const toBeSavedTask = new TaskModel({
      value: newTaskINPUT.value,
    });

    const savedTask = await toBeSavedTask.save();

    return savedTask;
  }
}
