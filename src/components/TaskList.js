import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function TaskList({ tasks, deleteTask, updateTask, toggleDone }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    updateTask(id, editText);
    setEditId(null);
  };

  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body1" sx={{ width: 30 }}>
              {index + 1}.
            </Typography>

            <Checkbox
              checked={task.done}
              onChange={() => toggleDone(task.id)}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon sx={{ color: "green" }} />}
            />

            <Box flexGrow={1}>
              {editId === task.id ? (
                <TextField
                  fullWidth
                  variant="standard"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleSaveEdit(task.id)}
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={task.done ? <s>{task.text}</s> : task.text}
                  secondary={task.date}
                />
              )}
            </Box>

            {editId === task.id ? (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleSaveEdit(task.id)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleEdit(task.id, task.text)}
              >
                Edit
              </Button>
            )}

            <IconButton onClick={() => deleteTask(task.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TaskList;
