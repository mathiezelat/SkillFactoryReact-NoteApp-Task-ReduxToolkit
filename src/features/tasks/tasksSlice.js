import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: JSON.parse(localStorage.getItem('tasks')) || [],
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.value.unshift(action.payload)

			localStorage.setItem('tasks', JSON.stringify(state.value))
		},
		updateTask: (state, action) => {
			const task = state.value.find(task => task.id === action.payload.id)

			if (task) {
				task.title = action.payload.newTask.title
				task.description = action.payload.newTask.description
			}

			localStorage.setItem('tasks', JSON.stringify(state.value))
		},
		deleteTask: (state, action) => {
			const taskIndex = state.value.findIndex(
				task => task.id === action.payload
			)

			state.value.splice(taskIndex, 1)

			localStorage.setItem('tasks', JSON.stringify(state.value))
		},
		completeTask: (state, action) => {
			const task = state.value.find(task => task.id === action.payload)

			if (task) {
				task.completed = !task.completed
			}

			localStorage.setItem('tasks', JSON.stringify(state.value))
		},
		deleteCompletedTasks: (state, action) => {
			const newTasks = state.value.filter(
				task => task.completed === false
			)

			state.value = newTasks

			localStorage.setItem('tasks', JSON.stringify(state.value))
		},
	},
})

export const {
	addTask,
	updateTask,
	deleteTask,
	completeTask,
	deleteCompletedTasks,
} = tasksSlice.actions

export default tasksSlice.reducer
