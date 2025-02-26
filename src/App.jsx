import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let taskSring = localStorage.getItem("tasks")
    if (taskSring) {
      let tasks = JSON.parse(localStorage.getItem("tasks"))
      setTasks(tasks)
    }
  }, [])


  const saveToLS = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


  const handleEdit = (e, id) => {
    let t = tasks.filter(i => i.id === id)
    setTask(t[0].task)
    let newTasks = tasks.filter(item => {
      return item.id !== id
    });
    setTasks(newTasks)
    saveToLS(newTasks);
  }

  const handleDelete = (e, id) => {
    let newTasks = tasks.filter(item => {
      return item.id !== id
    });
    setTasks(newTasks)
    saveToLS(newTasks);
  }

  const handleAdd = () => {
    if (task) {
      const newTasks = [...tasks, { id: uuidv4(), task, isCompleted: false }];
      setTasks(newTasks);
      setTask("");
      saveToLS(newTasks);
    }

    else {
      alert("Please enter a task")
    }
  }

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = tasks.findIndex(item => {
      return item.id === id;
    });
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveToLS(newTasks);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-zinc-300 my-5 rounded-xl p-5 min-h-[80vh] max-lg:w-[90vw]">
        <div className="addtask my-5">
          <h2 className='text-lg font-bold mb-4'>Add a Task</h2>
          <input onChange={handleChange} value={task} type="text" className='w-1/2 p-2 rounded-md' />
          <button onClick={handleAdd} className='bg-zinc-800 hover:bg-zinc-950 p-2 py-1 font-bold text-base text-white rounded-md mx-6'>Save</button>
        </div>
        <h2 className='text-lg font-bold'>Your Tasks</h2>
        <div className="tasks">
          {tasks.length === 0 && <div className='m-3'>No Tasks To Display</div>}
          {
            tasks.map(item => {
              return <div key={item.id} className="task flex w-1/2 max-lg:w-full justify-between my-3">
                <div className='flex gap-4'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.task}</div></div>
                <div className="button flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-zinc-800 hover:bg-zinc-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-zinc-800 hover:bg-zinc-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'>Delete</button>
                </div>
              </div>
            })}
        </div>
      </div>
    </>
  )
}

export default App
