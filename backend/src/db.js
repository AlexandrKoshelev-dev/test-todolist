const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("todolist", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
})

const Todo = sequelize.define(
  "Todo",
  {
    title: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "todos",
    timestamps: false,
  }
)

exports.createTodo = async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    completed: req.body.completed,
  })
  res.status(200).send(todo.id.toString())
}

exports.removeOne = async (req, res) => {
  await Todo.destroy({
    where: {
      id: req.body.id,
    },
  })
}

exports.completed = async (req, res) => {
  await Todo.update(
    {
      completed: req.body.completed,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
}

exports.getAll = async (req, res) => {
  const todos = await Todo.findAll()
  res.status(200).send(todos)
}
;(async () => {
  await sequelize.sync()
  console.log("db init")
})()
