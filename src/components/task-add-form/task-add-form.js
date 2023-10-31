import { Component } from "react";

import "./task-add-form.css";

class TaskAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      priority: "",
    };
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.name &&
      this.state.name.length > 2 &&
      this.state.priority &&
      this.state.priority > 0 &&
      this.state.priority < 4
    ) {
      this.props.onAdd(this.state.name, this.state.priority);
      this.setState({
        name: "",
        priority: "",
      });
    } else {
      console.log("IT'S FUCKING Error, YOU, IDIOTE!");
    }
  };

  render() {
    const { name, priority } = this.state;

    return (
      <div className="app-add-form">
        <h3>Add your task for today</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="What should you do?"
            name="name"
            value={name}
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="Priority? (1 - FCKing today, 3 - Leave it for tmr ;)"
            name="priority"
            value={priority}
            onChange={this.onValueChange}
          />

          <button type="submit" className="btn btn-outline-light">
            Add task
          </button>
        </form>
      </div>
    );
  }
}

export default TaskAddForm;
