import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import {
  GetAllTasksDocument,
  GetAllTasksQuery,
  UpdateTaskMutation,
  UpdateTaskDocument,
  UpdateTaskInput,
  UpdateTaskMutationVariables,
  Task,
} from "client/generated/graphql";

interface Props {
  children: React.ReactNode;
}
export const singleTaskSample: Task = {
  _id: "1",
  value: "task 1",
  checked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const fakeDataArray: Task[] = [
  singleTaskSample,
  {
    _id: "2",
    value: "Task 2",
    checked: true,
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2022-01-01T00:00:00Z",
  },
];

//added MockedResponse to type mocks results
const mocks: MockedResponse<GetAllTasksQuery | UpdateTaskMutation>[] = [
  {
    request: {
      query: GetAllTasksDocument,
    },
    result: {
      data: {
        tasks: fakeDataArray,
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
          ...singleTaskSample,
          checked: true,
        },
      },
    }),
  },
];

export const ApolloMockProviderReusable = ({ children }: Props) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};

/*  */
