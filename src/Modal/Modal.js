import React from "react"
import "./Modal.css"

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ isOpen: true })}>Инфо</button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Заметки</h1>
              <p>Приложение для заметок</p>
              <button onClick={() => this.setState({ isOpen: false })}>
                Закрыть окно
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
