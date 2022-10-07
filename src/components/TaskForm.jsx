import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/tasksSlice'

const TaskForm = () => {
	const [task, setTask] = useState({
		title: '',
		description: '',
	})

	const dispatch = useDispatch()

	const handleChange = event => {
		setTask({
			...task,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = event => {
		event.preventDefault()

		if (task.title.trim() && task.description.trim()) {
			const newTask = {
				id: uuid(),
				title: task.title.trim(),
				description: task.description.trim(),
				completed: false,
			}

			dispatch(addTask(newTask))

			setTask({
				title: '',
				description: '',
			})

			event.target.reset()
		}
	}

	return (
		<div className="bg-white rounded-lg p-4">
			<form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
				<input
					type="text"
					placeholder="Write your task title..."
					name="title"
					onChange={handleChange}
					required={true}
					value={task.title}
					className="flex-1 px-4 text-black/70 block rounded-md border border-black/10 placeholder:italic placeholder:text-black/30 focus:border-sky-300/30 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
				/>
				<div className="flex gap-2 flex-auto">
					<input
						type="text"
						placeholder="Write your task description..."
						name="description"
						onChange={handleChange}
						required={true}
						value={task.description}
						className="flex-1 px-4 text-black/70 block rounded-md border border-black/10 placeholder:italic placeholder:text-black/30 focus:border-sky-300/30 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
					/>
					<input
						type="submit"
						value="Add"
						className="flex-none px-4 py-2 bg-green-100 text-black/80 font-mono font-bold hover:text-green-500 hover:bg-green-200 cursor-pointer transition-colors rounded-md focus:outline-none focus:ring focus:ring-green-50"
					/>
				</div>
			</form>
		</div>
	)
}

export default TaskForm
