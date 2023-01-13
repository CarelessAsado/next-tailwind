import { SingleTask } from "components/SingleTask";
import React from "react";
import { fireEvent, getByTitle, render, waitFor } from "@testing-library/react";
import { Task } from "client/generated/graphql";
import { ApolloMockProviderReusable } from "./ApolloMockProvider";

const task: Task = {
  _id: "1",
  value: "task 1",
  checked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const queryData: Task[] = [task];
describe("SingleTask", () => {
  it("should render task value and delete button", () => {
    // Arrange

    const handleDeleteState = jest.fn();
    const handleUpdateState = jest.fn();
    // Act
    const { getByText, getByRole, getByTitle } = render(
      <ApolloMockProviderReusable>
        <SingleTask
          task={task}
          handleDeleteState={handleDeleteState}
          handleUpdateState={handleUpdateState}
        />
      </ApolloMockProviderReusable>
    );
    // Assert

    expect(getByText(task.value)).toBeDefined();
    expect(getByRole("checkbox")).toBeDefined();
    expect(getByTitle("Delete")).toBeDefined();
  });
  it("it should check and uncheck checkbox", async () => {
    // Arrange

    const handleDeleteState = jest.fn();
    const handleUpdateState = jest.fn();
    // Act
    const { getByRole } = render(
      <ApolloMockProviderReusable>
        <SingleTask
          task={task}
          handleDeleteState={handleDeleteState}
          handleUpdateState={handleUpdateState}
        />
      </ApolloMockProviderReusable>
    );
    // Assert
    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeDefined();
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(handleUpdateState).toHaveBeenCalled();
      expect(handleUpdateState).toHaveBeenCalledWith({
        _id: "1",
        value: "RESPONSE",
        checked: true,
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
        __typename: "Task",
      });
      /*  expect(checkbox.checked).toBe(true); */
    });
  });

  it("should render multiple tasks", () => {
    const handleDeleteState = jest.fn();
    const handleUpdateState = jest.fn();
    const { getAllByTestId } = render(
      <ApolloMockProviderReusable>
        {queryData.map((task) => (
          <SingleTask
            task={task}
            key={task._id}
            handleDeleteState={handleDeleteState}
            handleUpdateState={handleUpdateState}
          />
        ))}
      </ApolloMockProviderReusable>
    );
    const deleteButtons = getAllByTestId("delete-button");
    expect(deleteButtons.length).toBe(3);
  });
});
