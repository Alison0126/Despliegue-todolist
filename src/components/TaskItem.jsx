import { useState } from 'react'
import '../styles/TaskItem.css'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleToggle = () => {
    onToggle(task.id, task.completed)
  }

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      onDelete(task.id)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editTitle.trim()) {
      alert('El título no puede estar vacío')
      return
    }

    setIsSubmitting(true)
    try {
      await onEdit(task.id, editTitle, editDescription)
      setIsEditing(false)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isEditing) {
    return (
      <div className="task-item editing">
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="form-group">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              disabled={isSubmitting}
              className="edit-input"
            />
          </div>
          <div className="form-group">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              disabled={isSubmitting}
              className="edit-textarea"
              rows="2"
            />
          </div>
          <div className="edit-actions">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-save"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              disabled={isSubmitting}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <small className="task-date">{formatDate(task.created_at)}</small>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit"
          title="Editar"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-delete"
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskItem
