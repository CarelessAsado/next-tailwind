/* import { graphqlSchema } from "model/Task"; */
import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

  await start;
  const apolloHandler = server.createHandler({ path: "/api/graphql" });
  await apolloHandler(req, res);
}

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

/* const resolvers = {
  Query: {
         async tasks(root, args, context, info) {
      // Use the Mongoose Task model to find all tasks
      const tasks = await Task.find();
      return tasks;
    },
    async task(root, { id }, context, info) {
      // Use the Mongoose Task model to find a single task by id
      const task = await Task.findById(id);
      return task;
    }, 
  },
}; */
