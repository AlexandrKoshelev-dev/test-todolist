import axios from "axios"

export default class TodoService {
  static async getAll() {
    try {
      const response = await axios.get("http://localhost:8000/")
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  static async createTodo(title) {
    try {
      const response = await axios.post("http://localhost:8000/", {
        title,
        completed: false,
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }

  static async removeTodo(id) {
    try {
      await axios.post("http://localhost:8000/rem", { id })
    } catch (e) {
      console.log(e)
    }
  }

  static async completed(id, completed) {
    try {
      await axios.post("http://localhost:8000/compl", { id, completed })
    } catch (e) {
      console.log(e)
    }
  }
}
