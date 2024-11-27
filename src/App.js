import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  Modal,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import penguinImage from "./components/penguin.jpg";
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // This includes both date and time
  
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, done: false, date: formattedDateTime },
      ]);
      setTaskText("");
    }
  };
  

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <Container
      sx={{
        mt: 4,
        minHeight: "100vh",
        backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 4,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 8,
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#1976d2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AssignmentIcon fontSize="large" /> To-Do List
        </Typography>
  
        <Box display="flex" gap={2} sx={{ mb: 4 }}>
          <TextField
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a task"
            fullWidth
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
              },
            }}
          />
          <Button
            onClick={addTask}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ backgroundColor: "#1976d2" }}
          >
            Add
          </Button>
  
          <IconButton onClick={() => setCalendarOpen(true)}>
            <CalendarTodayIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </Box>
  
       <Grid
  container
  spacing={2}
  sx={{
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
  }}
>
  <Grid item xs={12} md={8}>
    <TaskList
      tasks={tasks}
      deleteTask={deleteTask}
      updateTask={updateTask}
      toggleDone={toggleDone}
    />
  </Grid>

  <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        animation: "fadeIn 1s ease-in-out", // Onboarding animation
      }}
    >
      <img
        src={penguinImage}
        alt="Penguin with Pad and Pen"
        style={{
          width: "100%",
          maxWidth: "275px",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out",
        }}
        className="penguin-hover"
      />
      <Typography variant="body2" sx={{ color: "#1976d2" }}>
        Stay productive with your tasks!
      </Typography>
    </Box>
  </Grid>
</Grid>

      </Box>
  
      {/* Calendar Modal */}
      <Modal open={calendarOpen} onClose={() => setCalendarOpen(false)}>
        <Paper
          sx={{
            p: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
          }}
        >
          <IconButton
            onClick={() => setCalendarOpen(false)}
            sx={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              sx={{
                "& .MuiPickersDay-root": {
                  color: "#1976d2",
                },
              }}
            />
          </LocalizationProvider>
        </Paper>
      </Modal>
    </Container>
  );
}

export default App;
