import React, { Component } from 'react'
import Overview from './components/Overview'
import './App.css';

export default class App extends Component {
  state = { 
    nextID: 2,
    tasks: [{name: 'test', ID: 0, editView: false}, {name: 'test2', ID: 1, editView: false}]
  }

  addNewTask = (e) => {
    e.preventDefault()
    const newTask = e.target[0].value
    if(newTask) {
      const newTasks = [...this.state.tasks, {name: newTask, ID: this.state.nextID, editView: false}]
      this.setState({nextID: this.state.nextID + 1, tasks: newTasks })
    }
  }

  deleteTask = (e) => {
    const taskID = Number(e.target.value)
    
    const indexToDelete = this.state.tasks.findIndex(task => {
      return task.ID === taskID
    })

    const newState = [
      ...this.state.tasks.slice(0, indexToDelete),
      ...this.state.tasks.slice(indexToDelete + 1)
    ]

    this.setState({tasks: newState})
  }

  editTask = (e) => {
    const taskID = Number(e.target.value)

    const indexToEdit = this.state.tasks.findIndex(task => {
      return task.ID === taskID
    })
    
    const taskEditView = this.state.tasks[indexToEdit]
    taskEditView.editView = true

    const newState = this.state.tasks.toSpliced(indexToEdit, 1, taskEditView)

    this.setState({tasks: newState})
  }

  confirmEdit = (e) => {
    e.preventDefault()
    const taskID = Number(e.target.attributes.value.value)
    const indexToEdit = this.state.tasks.findIndex(task => {
      return task.ID === taskID
    })

    const newTaskName = document.getElementById('newTaskName').value

    const editedTask = this.state.tasks[indexToEdit]

    editedTask.name = newTaskName
    editedTask.editView = false

    const newState = this.state.tasks.toSpliced(indexToEdit, 1, editedTask)

    this.setState({tasks: newState})
  }
  

  render() {
    return (
      <div>
        <InputForm addNewTask = {this.addNewTask} />
        <Overview 
          tasks = {this.state.tasks} 
          deleteTask = {this.deleteTask} 
          editTask = {this.editTask} 
          confirmEdit = {this.confirmEdit}
        />
      </div>
    )
  }
}

class InputForm extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    const {addNewTask} = this.props
    return(
      <form onSubmit={addNewTask}>
        <input type="text" placeholder='New Task...' />
        <button type='submit'>Submit</button>
        <button type='bigButton' id="bigButt-ons">Bebe's Big Button</button>
      </form>
    )
  }
}