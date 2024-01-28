"use client"

import {
  atom,
  useAtom,
  useDispatch,
  useValue,
  session,
  useActions,
  getValue,
  getAtomValue,
  setAtom,
} from "atomic-state"
import Link from "next/link"
import { Fragment } from "react"

type TodoActions = {
  updateTitle: {
    id: string
    title: string
  }
  toggleComplete: string
  removeTodo: string
}

const todosState = atom<TodoType[], TodoActions>({
  key: "todos",
  default: [],
  effects: [
    async ({ state, cancel }) => {
      if (state.length > 3) {
        cancel()
      }
    },
  ],

  actions: {
    removeTodo({ args, dispatch }) {
      dispatch((previousTodos) =>
        previousTodos.filter(($todo) => $todo.id !== args)
      )
    },

    toggleComplete({ args, dispatch }) {
      dispatch((previousTodos) =>
        previousTodos.map(($todo) =>
          $todo.id === args
            ? {
                ...$todo,
                completed: !$todo.completed,
              }
            : $todo
        )
      )
    },

    updateTitle({ args, dispatch }) {
      dispatch((previousTodos) =>
        previousTodos.map(($todo) =>
          $todo.id === args.id
            ? {
                ...$todo,
                title: args.title,
              }
            : $todo
        )
      )
    },
  },
  persist: true,
})

export default function App() {
  return (
    <div className="p-16">
      <div className="py-4 space-y-2">
        <div className="flex space-x-2">
          <ExportDataButton />
          <ImportDataButton />
        </div>
        <hr />
        <AddTodoButton />
        <Todos />
      </div>
      <TodoData />
    </div>
  )
}

function AddTodoButton() {
  return (
    <button
      className="btn"
      onClick={() => {
        const previousTodos = getValue(todosState)
        setAtom(todosState, [
          {
            id: crypto.randomUUID(),
            title: "",
            completed: false,
          },
          ...previousTodos,
        ])
      }}
    >
      Add todo
    </button>
  )
}

function Todos() {
  const todos = useValue(todosState)

  return todos.map((todo) => <Todo todo={todo} key={"show" + todo.id} />)
}

function ExportDataButton() {
  const exportedData = () => {
    const todos = getValue(todosState)

    console.log(todos)

    const data = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(todos)
    )}`

    return data
  }

  return (
    <a
      className="btn"
      download={"todos.json"}
      onClick={(e) => {
        e.currentTarget.href = exportedData()
      }}
    >
      Export data
    </a>
  )
}

function ImportDataButton() {
  return (
    <div className="relative">
      <button className="btn w-32 overflow-hidden absolute top-0">
        Import data:
        <input
          type="file"
          name=""
          id=""
          placeholder="Import data"
          onChange={(e) => {
            try {
              const reader = new FileReader()

              reader.readAsText(e.target.files![0], "utf-8")

              reader.onload = (e) => {
                const parsedTodos = JSON.parse(e.target!.result as string)

                setAtom(todosState, parsedTodos)
              }
            } catch {}
          }}
        />
      </button>
    </div>
  )
}

function Todo({ todo }: { todo: TodoType }) {
  return (
    <div className="space-x-2">
      <TodoTitle todo={todo} />
      <TodoActions todo={todo} />
    </div>
  )
}

function TodoActions({ todo }: { todo: TodoType }) {
  const { toggleComplete, removeTodo } = useActions(todosState)
  return (
    <Fragment>
      <button className="btn btn-error" onClick={() => removeTodo(todo.id)}>
        Remove
      </button>
      <button className="btn" onClick={() => toggleComplete(todo.id)}>
        Toggle completed
      </button>
    </Fragment>
  )
}

function TodoTitle({ todo }: { todo: TodoType }) {
  const { updateTitle } = useActions(todosState)

  return (
    <input
      type="text"
      value={todo.title}
      disabled={todo.completed}
      onChange={(e) => {
        updateTitle({
          id: todo.id,
          title: e.target.value,
        })
      }}
      placeholder="Todo title"
      className={`input input-bordered ${todo.completed && "line-through"}`}
    />
  )
}

const todoDataState = atom({
  key: "todoData",
  get({ get }) {
    const todos = get(todosState)

    return JSON.stringify(todos, null, 2)
  },
})

function TodoData() {
  const todoData = useValue(todoDataState)

  return <pre>{todoData}</pre>
}

type TodoType = {
  id: string
  title: string
  completed: boolean
}
