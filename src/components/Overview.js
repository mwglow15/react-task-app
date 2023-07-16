import React, { Component } from 'react'

export default class Overview extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const editing = this.props.tasks.some(task => {
      return task.editView === true
    })
    const taskList = this.props.tasks.map(task => {
      if (task.editView) {
        return(
          <li key={task.ID}>
            <form onSubmit={this.props.confirmEdit} value={task.ID}>
              <input defaultValue={task.name} id='newTaskName'/>
              <button value={task.Id} type='submit'>Confirm Edit</button>
            </form>
          </li>
        )
      } else {
        return (
          <li key={task.ID}>
            { task.name }  
            <button value={task.ID} onClick={this.props.editTask} disabled={editing}>Edit</button>
            <button value={task.ID} onClick={this.props.deleteTask} disabled={editing}>Delete</button>
          </li> 
        )
      }
    })

    return(
      <ul className="taskCard">
        {taskList}
      </ul>
    )
  }
}