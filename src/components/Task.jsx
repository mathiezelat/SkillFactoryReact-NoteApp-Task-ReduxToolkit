import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import {
	updateTask,
	deleteTask,
	completeTask,
} from '../features/tasks/tasksSlice'

const Task = ({ id, title, description, completed }) => {
	const [input, setInput] = useState({
		title,
		description,
	})

	const [edit, setEdit] = useState(false)

	const dispatch = useDispatch()

	const handleEditTask = () => {
		if (input.title.trim() && input.description.trim()) {
			setEdit(!edit)

			if (title !== input.title || description !== input.description) {
				dispatch(updateTask({ id, newTask: input }))
			}
		}
	}

	const handleInput = event => {
		const newTask = {
			...input,
			[event.currentTarget.id]: event.currentTarget.textContent,
		}

		setInput(newTask)
	}

	return (
		<motion.div
			className={`${
				completed ? 'bg-violet-200/5' : ''
			} flex items-center justify-between px-4 py-4 rounded-md border shadow-sm transition`}
			initial={{ opacity: 0 }}
			transition={{
				duration: 0.1,
				ease: 'backOut',
			}}
			animate={{
				opacity: 1,
			}}
			exit={{ opacity: 0 }}
		>
			<div className="flex gap-4 items-center w-8/12 sm:w-10/12">
				<input
					type="checkbox"
					checked={completed}
					onChange={() => dispatch(completeTask(id))}
					className="flex-none w-7 h-7 appearance-none border-1 bg-violet-50/10 focus:ring-2 focus:ring-violet-400 hover:ring-violet-400 focus:bg-white checked:focus:bg-violet-400 border-black/10 rounded-full indeterminate:bg-gray-300 checked:bg-violet-400 checked:hover:bg-violet-400 checked:focus:hover:bg-violet-400 checked:border-violet-400 transition cursor-pointer"
				/>
				<div className="flex flex-col gap-2 pr-4 w-10/12">
					<h2
						className={`${
							completed
								? 'line-through text-opacity-40'
								: 'text-opacity-70'
						} ${
							edit ? 'outline-dashed' : ''
						} text-black decoration-violet-400/70 decoration-2 break-words leading-none font-semibold text-lg transition-all outline-offset-2 outline-1 outline-black/10 focus:outline-yellow-400 `}
						id="title"
						onInput={handleInput}
						contentEditable={edit}
						suppressContentEditableWarning={true}
					>
						{title}
					</h2>
					<p
						className={`${
							completed
								? 'line-through text-opacity-40'
								: 'text-opacity-60'
						} ${
							edit ? 'outline-dashed' : ''
						} text-black decoration-violet-400/70 decoration-2 break-words leading-none text-sm transition-all outline-offset-2 outline-1 outline-black/10 focus:outline-yellow-400`}
						id="description"
						onInput={handleInput}
						contentEditable={edit}
						suppressContentEditableWarning={true}
					>
						{description}
					</p>
				</div>
			</div>
			<div className="flex gap-2">
				<button
					onClick={handleEditTask}
					className="text-black/70 bg-yellow-100 hover:text-yellow-500 hover:bg-yellow-200 transition rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="currentColor"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
					</svg>
				</button>
				<button
					onClick={() => dispatch(deleteTask(id))}
					className="text-black/70 bg-red-100 hover:text-red-500 hover:bg-red-200 transition rounded-md p-2 focus:outline-none focus:ring focus:ring-red-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="currentColor"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
					</svg>
				</button>
			</div>
		</motion.div>
	)
}

export default Task
