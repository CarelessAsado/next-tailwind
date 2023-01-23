import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  ID,
  Authorized,
  ObjectType,
  Ctx,
} from "type-graphql";
import { User, UserModel } from "server/schemas/User.schema";
import { DocumentType } from "@typegoose/typegoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "constants/constants";

export type UserWithoutPwd = Omit<User, "password" | "admin">;

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  name!: string;
  @Field()
  password!: string;
  @Field()
  email!: string;
}
@InputType()
class LoginInput {
  @Field()
  password!: string;
  @Field()
  email!: string;
}

export default function getCleanUser(user: DocumentType<User>): UserWithoutPwd {
  const { password, admin, ...rest } = user.toObject();
  return rest;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user!: User;

  @Field()
  accessToken!: string;
}

@Resolver(User)
export class UserResolver {
  /*   @Authorized()
  @Query(() => [User])
  async tasks(): Promise<User[]> {
    console.log("INSIDE QUERY fetching DB");
    return UserModel.find({});
  }
*/
  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("loginInput") loginInput: LoginInput
  ): Promise<{ user: UserWithoutPwd; accessToken: string }> {
    const user = await UserModel.findOne({ email: loginInput.email }).select(
      "+password"
    );
    const notFoundError = new Error("Password or email not correct.");
    if (!user) {
      throw notFoundError;
    }

    console.log(user, 666);
    //add bcrypt logic AFTERWARDS
    if (user.password !== loginInput.password) {
      throw notFoundError;
    }

    const jwtPayload = { _id: user._id, admin: user.admin };

    /* I try adding this in the verify part of the auth flow,BUUUUT puedo agregar otras keys y typescript no se queja( ver en la otra fn q hice type predicate guard y pareció andar)
    function verifyContextWithTypescript(obj: any): obj is ContextType {
  return (
    "admin" in obj  && "_id" in obj
  );
} */

    //en cambio con este control, ahora me garantizo q si le agrego algo a Context, aca salta el error CHEQUEADO ✅
    function verifyContextWithTypescript(obj: ContextType) {
      return obj;
    }
    var token = jwt.sign(verifyContextWithTypescript(jwtPayload), JWT_SECRET);
    return { user: getCleanUser(user), accessToken: token };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logoutUser(
    @Ctx() ctx: ContextType
    /* @Arg("loginInput") loginInput: LoginInput */
  ): Promise<boolean> {
    const user = true;
    /*  const user = await UserModel.findOne({ email: loginInput.email }).select(
      "+password"
    ); */

    //PROBA INVERTIR EL ORDEN DE CTX
    console.log(
      ctx,
      "REVERSE THE TYPEGRAPHQL ARGS ORDER, see if it works still"
    );
    const notFoundError = new Error("Password or email not correct.");
    if (!user) {
      throw notFoundError;
    }

    return true;
  }

  //ERROR / createUser QUERY: I can query pwd and admin from client side even though I am not returning those fields
  //https://www.google.com/search?q=make+a+field+optional+in+graphql&oq=make+a+field+optional+in+graphql&aqs=chrome..69i57j0i22i30.8849j0j4&sourceid=chrome&ie=UTF-8
  @Mutation(() => User)
  async createUser(
    @Arg("newUserINPUT") newUserINPUT: NewUserInput
  ): Promise<UserWithoutPwd> {
    const toBeSavedUser = new UserModel({
      ...newUserINPUT,
    });

    const savedUser = await toBeSavedUser.save();
    console.log(savedUser, 666);
    /* const del = await savedUser.delete(); */

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
