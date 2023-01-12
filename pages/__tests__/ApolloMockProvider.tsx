import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import {
  GetAllTasksDocument,
  GetAllTasksQuery,
} from "client/generated/graphql";

interface Props {
  children: React.ReactNode;
}

//added MockedResponse to type mocks results
const mocks: MockedResponse<GetAllTasksQuery>[] = [
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
];

export const ApolloMockProviderReusable = ({ children }: Props) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};
