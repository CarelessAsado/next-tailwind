/* import { ITaskObject } from "model/Task"; */
import React, { useState } from "react";
import * as taskAPI from "client/clientAPI/taskAPI";
import { Task, useDeleteTaskMutation } from "client/generated/graphql";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

export const SingleTask = ({
  task,
  handleDeleteState,
}: {
  task: Task;
  handleDeleteState: (id: string) => void;
}) => {
  const [checked, setChecked] = useState(task.checked);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    /*    const { data } = await taskAPI.updateTask({
      ...task,
      checked: event.target.checked,
    });
    console.log(data, "SAVED, update REDUX STATE");
    setChecked(data.checked); */
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
    <div className={`flex gap-5 ${checked && "text-slate-400 line-through"}`}>
      <Link href={"/form/" + task._id}>{task.value}</Link>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <AiFillDelete onClick={handleDeleteTask} />
    </div>
  );
};
