import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function TaskForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <TextField
        label="Add a new task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
}

export default TaskForm;
