import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// компонент
function App() {
  // состояние
  const [tasks, setTasks] = useState([
    {
      text: 'поесть',
    },
    {
      text: 'погулять'
    }
  ])
  // состояние
  const [inputText, setInputText] = useState('')
  const [editTaskId, setEditTaskId] = useState(null)
  const [editText, setEditText] = useState('')

  const inputRef = useRef(null)

  function addTask(event) {
    console.log('add new task')
    event.preventDefault()
    setTasks(() => {
      let nextTasks = [...tasks]
      nextTasks.push({
        text: inputText
      })
      return nextTasks
    })
    setInputText('')
  }
  function deleteTask(id) {
    let nextTasks = [...tasks]
    nextTasks.splice(id, 1)
    setTasks(nextTasks)
  }
  function editTask(id, text,event) {
    event.preventDefault()
    if (editTaskId == id) {
      console.log('галочка');
      let nextTasks = [...tasks]
      nextTasks[id].text = editText
      setEditTaskId(null)
    }
    else {
      console.log('карандаш');
      setEditText(text)
      setEditTaskId(id)
    }
    // inputRef.current.focus()
  }
  return (
    <>
      <form action="">
        <h1>ToDo App</h1>
        <ul>
          {
            tasks.map((element, id) =>
              <li>
                {editTaskId == id ?
                  <input type="text" value={editText} onChange={(event) => setEditText(event.target.value)} ref={inputRef} autoFocus />
                  :
                  <p>{id + 1}. {element.text}</p>}
                <div className="taskButtons">
                  <button onClick={(event) => editTask(id, element.text,event)} type={editTaskId == id ?'submit':'button'}>{editTaskId == id ? '✅' : '✏️'}</button>
                  <button onClick={(event) => deleteTask(id)} type='button'>🗑️</button>
                </div>

              </li>
            )
          }

        </ul>
        <div className='formBottom'>
          <input id='taskInput' type="text" placeholder='Add new task' value={inputText} onChange={(event) => setInputText(event.target.value)} />
          <button disabled={inputText == "" ? true : false} onClick={(event) => addTask(event)}>📌</button>
          <button type='button'>💣</button>
        </div>
      </form>
    </>
  )
}

export default App
