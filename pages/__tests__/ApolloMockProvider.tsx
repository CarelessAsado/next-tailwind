import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import {
  GetAllTasksDocument,
  GetAllTasksQuery,
  UpdateTaskMutation,
  UpdateTaskDocument,
  UpdateTaskInput,
  UpdateTaskMutationVariables,
} from "client/generated/graphql";

interface Props {
  children: React.ReactNode;
}

//added MockedResponse to type mocks results
const mocks: MockedResponse<GetAllTasksQuery | UpdateTaskMutation>[] = [
  {
    request: {
      query: GetAllTasksDocument,
    },
    result: {
      data: {
        tasks: [
          {
            _id: "1",
            value: "Task 1",
            checked: false,
            createdAt: "2022-01-01T00:00:00Z",
            updatedAt: "2022-01-01T00:00:00Z",
          },
          {
            _id: "2",
            value: "Task 2",
            checked: true,
            createdAt: "2022-01-01T00:00:00Z",
            updatedAt: "2022-01-01T00:00:00Z",
          },
        ],
      },
    },
  },
  {
    request: {
      query: UpdateTaskDocument,
      variables: {
        task: {
          _id: "1",
          value: "task 1",
          checked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      } as UpdateTaskMutationVariables,
    },
    /*     newData: jest.fn(() => ({
      data: {
        updateTask: {
          _id: "1",
          value: "Task 1",
          checked: true,
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
    })), */
    result: () => ({
      data: {
        updateTask: {
          _id: "1",
          value: "RESPONSE",
          checked: true,
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
          __typename: "Task",
        },
      },
    }),
  },
];

export const ApolloMockProviderReusable = ({ children }: Props) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};

/*  */
