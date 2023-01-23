/* import { ITaskObject } from "model/Task"; */
import React, { useState } from "react";
import * as taskAPI from "client/clientAPI/taskAPI";
import {
  Task,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "client/generated/graphql";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

export const SingleTask = ({
  task,
  handleDeleteState,
  handleUpdateState,
}: {
  task: Task;
  handleDeleteState: (id: string) => void;
  handleUpdateState: (id: Task) => void;
}) => {
  const [updateTaskMutation, { data, loading, error }] =
    useUpdateTaskMutation();
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { __typename, ...rest } = task;
    try {
      const { data } = await updateTaskMutation({
        variables: {
          task: {
            ...rest,
            checked: event.target.checked,
          },
        },
      });
      if (data) {
        handleUpdateState(data.updateTask);
      }
    } catch (error) {
      alert(JSON.stringify(error));
      console.log(error);
    }
  };

  const [deleteTaskMutation, { loading: deleteLoading }] =
    useDeleteTaskMutation();

  const handleDeleteTask = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    try {
      const { data } = await deleteTaskMutation({
        variables: {
          taskId: task._id,
        },
      });
      //modify general state
      handleDeleteState(task._id);
    } catch (error: any) {
      alert(error?.message);
    }
  };

  return (
    <div
      className={`flex gap-5 ${task.checked && "text-slate-400 line-through"}`}
    >
      <Link href={"/form/" + task._id}>{task.value}</Link>
      <input
        type="checkbox"
        checked={task.checked}
        onChange={handleCheckboxChange}
      />
      <AiFillDelete onClick={handleDeleteTask} title="Delete" />
    </div>
  );
};
