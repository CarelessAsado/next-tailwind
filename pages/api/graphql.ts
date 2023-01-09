/* import { graphqlSchema } from "model/Task"; */
import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Query,
  Arg,
  buildSchema,
} from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose, { Types } from "mongoose";
import dbConnect from "utils/dbConnect";
const { ObjectId } = Types;
/* import { getAllTasks } from "./tasks.controller"; */

@ObjectType()
class Task {
  @Field()
  @prop()
  readonly _id!: string;

  @Field()
  @prop()
  value!: string;

  @Field()
  @prop()
  checked!: boolean;
}

export const TaskModel = getModelForClass(Task);
@Resolver(Task)
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return await TaskModel.find({});
    // Return a list of tasks here
  }

  /*  @Query(() => Task)
  task(@Arg("taskID") taskID: typeof ObjectId): Task {
     return TaskModel.findById(taskID);
  } */
}

const schema = await buildSchema({
  resolvers: [TaskResolver],
});

const server = new ApolloServer({
  schema,
});

//we need to tell Next.js not to parse the incoming request and let GraphQL handle it for us
export const config = {
  api: {
    bodyParser: false,
  },
};

// DO NOT await apolloServer.start() in the handler function. you'll get "Error: called start() with surprising state" as it was trying to start the server with every request
const start = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //https://stackoverflow.com/questions/68745267/apollo-server-micro-response-is-missing-header-access-control-allow-methods-p
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await dbConnect();
  await start;
  const apolloHandler = server.createHandler({ path: "/api/graphql" });
  await apolloHandler(req, res);
}
