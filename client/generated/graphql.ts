import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  newTaskINPUT: NewTaskInput;
};


export type MutationDeleteTaskArgs = {
  taskID: Scalars['String'];
};

export type NewTaskInput = {
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  task: Task;
  tasks: Array<Task>;
};


export type QueryTaskArgs = {
  taskID: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['ID'];
  checked: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', _id: string, value: string, checked: boolean, createdAt: any, updatedAt: any }> };

export type GetSingleTaskQueryVariables = Exact<{
  taskID: Scalars['String'];
}>;


export type GetSingleTaskQuery = { __typename?: 'Query', task: { __typename?: 'Task', _id: string, value: string, checked: boolean, createdAt: any, updatedAt: any } };

export type CreateTaskMutationVariables = Exact<{
  newTaskINPUT: NewTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', value: string, _id: string, checked: boolean, createdAt: any, updatedAt: any } };

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: string };


export const GetAllTasksDocument = gql`
    query GetAllTasks {
  tasks {
    _id
    value
    checked
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
      }
export function useGetAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksQueryResult = Apollo.QueryResult<GetAllTasksQuery, GetAllTasksQueryVariables>;
export function refetchGetAllTasksQuery(variables?: GetAllTasksQueryVariables) {
      return { query: GetAllTasksDocument, variables: variables }
    }
export const GetSingleTaskDocument = gql`
    query getSingleTask($taskID: String!) {
  task(taskID: $taskID) {
    _id
    value
    checked
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSingleTaskQuery__
 *
 * To run a query within a React component, call `useGetSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleTaskQuery({
 *   variables: {
 *      taskID: // value for 'taskID'
 *   },
 * });
 */
export function useGetSingleTaskQuery(baseOptions: Apollo.QueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options);
      }
export function useGetSingleTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options);
        }
export type GetSingleTaskQueryHookResult = ReturnType<typeof useGetSingleTaskQuery>;
export type GetSingleTaskLazyQueryHookResult = ReturnType<typeof useGetSingleTaskLazyQuery>;
export type GetSingleTaskQueryResult = Apollo.QueryResult<GetSingleTaskQuery, GetSingleTaskQueryVariables>;
export function refetchGetSingleTaskQuery(variables: GetSingleTaskQueryVariables) {
      return { query: GetSingleTaskDocument, variables: variables }
    }
export const CreateTaskDocument = gql`
    mutation createTask($newTaskINPUT: NewTaskInput!) {
  createTask(newTaskINPUT: $newTaskINPUT) {
    value
    _id
    checked
    createdAt
    updatedAt
    checked
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      newTaskINPUT: // value for 'newTaskINPUT'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($taskId: String!) {
  deleteTask(taskID: $taskId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;