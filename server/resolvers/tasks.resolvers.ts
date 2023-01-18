import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  ID,
  Authorized,
  UseMiddleware,
  MiddlewareFn,
} from "type-graphql";
import { Task, TaskModel } from "server/schemas/Task.schema";
import mongoose from "mongoose";
import { ContextType } from "pages/api/graphql";

@InputType()
class NewTaskInput implements Partial<Task> {
  @Field()
  value!: string;
}
@InputType()
class updateTaskInput implements Task {
  @Field(() => ID)
  _id!: mongoose.Types.ObjectId;

  @Field({ nullable: false })
  value!: string;

  @Field()
  checked!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
  /* TEST LATER STRICT TYPE HERE
  @Field()
  tuhna!: Date; */
}

@Resolver(Task)
export class TaskResolver {
  @Authorized()
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    console.log("INSIDE QUERY fetching DB");
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

  @Mutation(() => String)
  async deleteTask(@Arg("taskID") taskID: string): Promise<string> {
    const result = await TaskModel.findByIdAndDelete(taskID);
    if (!result) {
      throw new Error("Invalid task ID");
    }
    return taskID;
  }

  @Mutation(() => Task)
  async updateTask(@Arg("task") task: updateTaskInput): Promise<Task> {
    const result = await TaskModel.findById(task._id);
    if (!result) {
      throw new Error("Invalid task ID");
    }
    result.value = task.value;
    result.checked = task.checked;
    const savedTask = await result.save();
    return savedTask;
  }
}
