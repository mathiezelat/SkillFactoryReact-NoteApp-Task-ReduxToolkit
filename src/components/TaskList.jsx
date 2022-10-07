import { useSelector, useDispatch } from 'react-redux'
import Task from './Task'
import TaskForm from './TaskForm'
import { deleteCompletedTasks } from '../features/tasks/tasksSlice'
import { motion } from 'framer-motion'

const TaskList = () => {
	const tasks = useSelector(state => state.tasks.value)

	const dispatch = useDispatch()

	return (
		<div className="flex flex-col gap-4">
			<TaskForm />

			<div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 p-4 bg-white rounded-lg">
				<div className="flex gap-2">
					<p className="text-black/60 break-words leading-none font-medium  transition">
						Total:{' '}
						<span className="font-semibold">{tasks.length}</span>
					</p>
					<p className="border-l"> </p>
					<p className="text-black/60 break-words leading-none font-medium  transition">
						Completed:{' '}
						<span className="font-semibold">
							{
								tasks.filter(task => task.completed === true)
									.length
							}
						</span>
					</p>
				</div>
				<button
					onClick={() => dispatch(deleteCompletedTasks())}
					className="text-black/70 font-bold bg-red-100 hover:text-red-500 hover:bg-red-200 transition rounded-md p-2 focus:outline-none focus:ring focus:ring-red-50"
				>
					Delete completed
				</button>
			</div>

			<motion.div
				layout
				transition={{
					type: 'spring',
					stiffness: 1000,
					damping: 30,
					delayChildren: 1,
					staggerChildren: 1,
				}}
				className="flex flex-col gap-2 p-4 bg-white rounded-lg"
			>
				{tasks.length ? (
					tasks.map(task => (
						<Task
							key={task.id}
							id={task.id}
							title={task.title}
							description={task.description}
							completed={task.completed}
						/>
					))
				) : (
					<div className="border-dashed px-4 py-4 border-2">
						<p className="text-black/40 break-words leading-none font-semibold transition">
							Enter a new task
						</p>
					</div>
				)}
			</motion.div>
		</div>
	)
}

export default TaskList
