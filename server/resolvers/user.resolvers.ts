import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  ID,
  Authorized,
} from "type-graphql";
import { User, UserModel } from "server/schemas/User.schema";
import { DocumentType } from "@typegoose/typegoose";

type UserWithoutPwd = Omit<User, "password">;

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  name!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}

export default function getCleanUser(user: DocumentType<User>): UserWithoutPwd {
  const { password, ...rest } = user.toObject();
  return rest;
}

@Resolver(User)
export class UserResolver {
  /*   @Authorized()
  @Query(() => [User])
  async tasks(): Promise<User[]> {
    console.log("INSIDE QUERY fetching DB");
    return UserModel.find({});
  }

  @Query(() => User)
  async task(@Arg("taskID") taskID: string): Promise<User> {
    const task = await UserModel.findById(taskID);
    if (!task) {
      throw new Error("Invalid task ID");
    }
    return task;
  }
 */
  @Mutation(() => User)
  async createUser(
    @Arg("newUserINPUT") newUserINPUT: NewUserInput
  ): Promise<UserWithoutPwd> {
    const toBeSavedUser = new UserModel({
      ...newUserINPUT,
    });

    const savedUser = await toBeSavedUser.save();
    const del = await savedUser.delete();

    //CREATE TOKENS

    return getCleanUser(savedUser);
  }

  /*   @Mutation(() => String)
  async deleteTask(@Arg("taskID") taskID: string): Promise<string> {
    const result = await UserModel.findByIdAndDelete(taskID);
    if (!result) {
      throw new Error("Invalid task ID");
    }
    return taskID;
  }

  @Mutation(() => User)
  async updateTask(@Arg("task") task: updateTaskInput): Promise<User> {
    const result = await UserModel.findById(task._id);
    if (!result) {
      throw new Error("Invalid task ID");
    }
    result.value = task.value;
    result.checked = task.checked;
    const savedUser = await result.save();
    return savedUser;
  } */
}
