import { ITask } from "model/Task";
import React, { useState } from "react";

export const SingleTask = ({ task }: { task: ITask }) => {
  const [checked, setChecked] = useState(task.checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <div>{task.value}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
