/* import { ITaskObject } from "model/Task"; */
import React, { useState } from "react";
import * as taskAPI from "client/clientAPI/taskAPI";
import { Task } from "client/generated/graphql";
import Link from "next/link";

export const SingleTask = ({ task }: { task: Task }) => {
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

  return (
    <div className={`flex gap-5 ${checked && "text-slate-400 line-through"}`}>
      <Link href={"/form/" + task._id}>{task.value}</Link>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
