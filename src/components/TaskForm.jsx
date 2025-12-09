import { useState } from 'react'
import '../styles/TaskForm.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Por favor ingresa un título para la tarea')
      return
    }

    setIsSubmitting(true)
    try {
      await onAddTask(title, description)
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="¿Qué necesitas hacer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="task-input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          className="task-textarea"
          rows="3"
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="add-button"
      >
        {isSubmitting ? 'Agregando...' : 'Agregar Tarea'}
      </button>
    </form>
  )
}

export default TaskForm
