import TaskItem from './TaskItem'
import '../styles/TaskList.css'

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p className="empty-message">No hay tareas. ¡Crea una para empezar!</p>
      </div>
    )
  }

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title">Tareas Pendientes ({pendingTasks.length})</h2>
          <div className="tasks">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h2 className="section-title">Tareas Completadas ({completedTasks.length})</h2>
          <div className="tasks completed-section">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList
