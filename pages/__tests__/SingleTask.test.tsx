import { SingleTask } from "components/SingleTask";
import React from "react";
import { fireEvent, getByTitle, render, waitFor } from "@testing-library/react";
import { Task } from "client/generated/graphql";
import { ApolloMockProviderReusable } from "./ApolloMockProvider";
import { singleTaskSample } from "./ApolloMockProvider";
const queryData: Task[] = [singleTaskSample];
describe("SingleTask", () => {
  it("should render task value and delete button", () => {
    // Arrange

    const handleDeleteState = jest.fn();
    const handleUpdateState = jest.fn();
    // Act
    const { getByText, getByRole, getByTitle } = render(
      <ApolloMockProviderReusable>
        <SingleTask
          task={singleTaskSample}
          handleDeleteState={handleDeleteState}
          handleUpdateState={handleUpdateState}
        />
      </ApolloMockProviderReusable>
    );
    // Assert

    expect(getByText(singleTaskSample.value)).toBeDefined();
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
          task={singleTaskSample}
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
        ...singleTaskSample,
        checked: true,
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
