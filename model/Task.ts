import mongoose from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

export interface ITask extends mongoose.Document {
  value: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//maybe try to get the return type of .lean or .toObject
export type ITaskObject = Pick<
  ITask,
  "_id" | Exclude<keyof ITask, keyof mongoose.Document>
>;

const taskSchema = new mongoose.Schema<ITask>(
  {
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", taskSchema);
/* const Task2 = mongoose.model<ITask>("Task", taskSchema);

export default Task;

const TaskTC = composeMongoose(Task2);

// STEP 3: ADD NEEDED CRUD USER OPERATIONS TO THE GraphQL SCHEMA
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  userById: TaskTC.mongooseResolvers.findById(),
  userByIds: TaskTC.mongooseResolvers.findByIds(),
  userOne: TaskTC.mongooseResolvers.findOne(),
  userMany: TaskTC.mongooseResolvers.findMany(),
  userDataLoader: TaskTC.mongooseResolvers.dataLoader(),
  userDataLoaderMany: TaskTC.mongooseResolvers.dataLoaderMany(),
  userByIdLean: TaskTC.mongooseResolvers.findById({ lean: true }),
  userByIdsLean: TaskTC.mongooseResolvers.findByIds({ lean: true }),
  userOneLean: TaskTC.mongooseResolvers.findOne({ lean: true }),
  userManyLean: TaskTC.mongooseResolvers.findMany({ lean: true }),
  userDataLoaderLean: TaskTC.mongooseResolvers.dataLoader({ lean: true }),
  userDataLoaderManyLean: TaskTC.mongooseResolvers.dataLoaderMany({
    lean: true,
  }),
  userCount: TaskTC.mongooseResolvers.count(),
  userConnection: TaskTC.mongooseResolvers.connection(),
  userPagination: TaskTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  userCreateOne: TaskTC.mongooseResolvers.createOne(),
  userCreateMany: TaskTC.mongooseResolvers.createMany(),
  userUpdateById: TaskTC.mongooseResolvers.updateById(),
  userUpdateOne: TaskTC.mongooseResolvers.updateOne(),
  userUpdateMany: TaskTC.mongooseResolvers.updateMany(),
  userRemoveById: TaskTC.mongooseResolvers.removeById(),
  userRemoveOne: TaskTC.mongooseResolvers.removeOne(),
  userRemoveMany: TaskTC.mongooseResolvers.removeMany(),
});

// STEP 4: BUILD GraphQL SCHEMA OBJECT
export const graphqlSchema = schemaComposer.buildSchema();
 */
