import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";

import { QUERY_USER_SETTINGS } from "../../utils/queries.js";
import { UPDATE_KANBAN_SETTINGS } from "../../utils/mutations.js";

import AuthService from "../../utils/auth.js";

const ToDoList = () => {
  const userProfile = AuthService.getProfile();

  const [updateKanbanSettings] = useMutation(UPDATE_KANBAN_SETTINGS);
  const { loading, error, data } = useQuery(QUERY_USER_SETTINGS, {
    variables: { userId: userProfile?._id || userProfile?.user?._id },
  });

  const userSettings = data?.getUserSettings;

  if (!userSettings) {
    // Handle the case where userSettings is undefined or null
    console.error("User settings not found in query result.");
    return <p>Error loading user settings. Please try again later.</p>;
  }

  console.log("userSettings:", userSettings);

  let tasksWithoutTypename;

  if (userSettings.kanbanTasks.length === 0) {
    tasksWithoutTypename = [];
  } else {
    const { __typename: mainTypename, ...taskData } =
      userSettings.kanbanTasks[0];
    tasksWithoutTypename = [taskData];
  }

  console.log(
    "tasksWithoutTypename:",
    tasksWithoutTypename,
    typeof tasksWithoutTypename
  );

  const [tasks, setTasks] = useState(tasksWithoutTypename);
  const [newTask, setNewTask] = useState({ content: "", status: "Tasks" });

  useEffect(() => {
    console.log("Tasks variable changed (useEffect triggered):", tasks);
    updateKanbanSettings({
      variables: {
        userId: userProfile._id || userProfile.user._id,
        kanbanTasks: JSON.stringify(tasks),
      },
    }).then((res) => {
      console.log("Kanban settings updated:", res);
    });
  }, [tasks]);

  const handleInputChange = (e) => {
    const updatedTask = Object.assign({}, newTask, {
      [e.target.name]: e.target.value,
    });
    setNewTask(updatedTask);
  };

  const handleAddTask = () => {
    if (newTask.content !== "") {
      const updatedTask = Object.assign({}, newTask, {
        id: `task${tasks.length + 1}`,
      });
      const updatedTasks = tasks.concat(updatedTask);
      setTasks(updatedTasks);
      setNewTask({ content: "", status: "Tasks" });
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;

    const taskIndex = tasks.findIndex((task) => task.id === result.draggableId);
    const updatedTasks = tasks.slice();

    if (taskIndex !== -1) {
      const removedTask = updatedTasks.splice(taskIndex, 1)[0];
      removedTask.status = destination.droppableId;
      updatedTasks.splice(destination.index, 0, removedTask);

      setTasks(updatedTasks);
    }
  };

  return (
    <div className="kanban-board widget-content-wf">
      <div className="kanban-top-row-wf">
        <h4>Kanban Board</h4>
        <div className="modal-replacer-wf">
          <div className="modal-replacer-content-wf">
            <input
              type="text"
              className="kanban-textbox-wf widget-prevent-drag-wf"
              placeholder="Description"
              name="content"
              value={newTask.content}
              onChange={handleInputChange}
            />
            <select
              name="status"
              className="browser-default kanban-dropdown-wf widget-prevent-drag-wf"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="Tasks">Tasks</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="On Hold">On Hold</option>
            </select>
            <button
              className="waves-effect waves-light btn login-button-wf button-wf kanban-button-wf widget-prevent-drag-wf"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-row widget-prevent-drag-wf">
          {["Tasks", "In Progress", "Done", "On Hold"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="kanban-column"
                >
                  <h2>{status}</h2>
                  <div className="task-list">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-card widget-prevent-drag-wf"
                            >
                              <p>{task.content}</p>
                              <div className="task-icons">
                                <FaTrash
                                  className="icon delete-icon widget-prevent-drag-wf"
                                  onClick={() => handleDeleteTask(task.id)}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ToDoList;
