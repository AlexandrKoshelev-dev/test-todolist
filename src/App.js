import React, { useEffect } from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
import PropTypes from "prop-types"
import Loader from "./Loader"
import Modal from "./Modal/Modal"
import TodoService from "./API/TodoService"

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./Todo/AddTodo"))
      }, 2000)
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [isTodosLoading, setIsTodosLoading] = React.useState(false)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    setIsTodosLoading(true)
    const todos = await TodoService.getAll()
    setTodos(todos)
    setIsTodosLoading(false)
  }

  async function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
    todos.forEach(async (todo) => {
      if (todo.id === id) {
        await TodoService.completed(id, todo.completed)
      }
    })
  }

  async function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
    await TodoService.removeTodo(id)
  }

  async function addTodo(title) {
    const todo = await TodoService.createTodo(title)
    setTodos(
      todos.concat([
        {
          id: todo.data,
          completed: false,
          title,
        },
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Заметки</h1>
        <Modal />
        <React.Suspense fallback={<p>Загрузка...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {isTodosLoading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : isTodosLoading ? null : (
          <p>Заметок нет...</p>
        )}
      </div>
    </Context.Provider>
  )
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default App
