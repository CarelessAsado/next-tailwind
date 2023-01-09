import { gql } from "@apollo/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { graphqlSchema } from "model/Task";

/* const typeDefs = gql`
  type Task implements Node {
    id: ID!
    value: String!
    checked: Boolean!
    createdAt: DateTime!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }
`; */

const resolvers = {
  Query: {
    /*     async tasks(root, args, context, info) {
      // Use the Mongoose Task model to find all tasks
      const tasks = await Task.find();
      return tasks;
    },
    async task(root, { id }, context, info) {
      // Use the Mongoose Task model to find a single task by id
      const task = await Task.findById(id);
      return task;
    }, */
  },
};
