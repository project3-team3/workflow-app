import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//Temporary placeholder for the schedule. Once the database are all set, then delete this code."//
const initialTasks = [
  { id: 'task1', content: 'Task 1', status: 'Tasks' },

];

const ToDoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ content: '', status: 'Tasks' });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewTask({ content: '', status: 'Tasks' });
  };

  const handleInputChange = (e) => {
    const updatedTask = Object.assign({}, newTask, { [e.target.name]: e.target.value });
    setNewTask(updatedTask);
  };

  const handleAddTask = () => {
    const updatedTask = Object.assign({}, newTask, { id: `task${tasks.length + 1}` });
    const updatedTasks = tasks.concat(updatedTask);
    setTasks(updatedTasks);
    closeModal();
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
      <h4>Kanban Board</h4>
      <button onClick={openModal} className='widget-prevent-drag-wf waves-effect waves-light btn login-button-wf button-wf'>ADD TASK</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-row widget-prevent-drag-wf">
          {['Tasks', 'In Progress', 'Done', 'On Hold'].map((status) => (
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
                              className="task-card"
                            >
                              <p>{task.content}</p>
                              <div className="task-icons">
                                <FaTrash
                                  className="icon delete-icon"
                                  onClick={() => handleDeleteTask(task.id)}
                                />
                                <FaEdit
                                  className="icon edit-icon"
                                  onClick={() => {
                                    console.log('Edit task:', task.id);
                                  }}
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
      {modalIsOpen && (
         <div className="modal-overlay">
         <div className="modal">
           <FaTimes className="close-icon" onClick={closeModal} />
           <div className="modal-content">
             <h2>Add Task</h2>
             <input
               type="text"
               placeholder="Task content"
               name="content"
               value={newTask.content}
               onChange={handleInputChange}
             />
             <select
               name="status"
               value={newTask.status}
               onChange={handleInputChange}
             >
               <option value="Tasks">Tasks</option>
               <option value="In Progress">In Progress</option>
               <option value="Done">Done</option>
               <option value="On Hold">On Hold</option>
             </select>
             <button className="waves-effect waves-light btn login-button-wf button-wf" onClick={handleAddTask}>Add</button>
             <button className='waves-effect waves-light btn login-button-wf button-wf' onClick={closeModal}>Cancel</button>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default ToDoList;