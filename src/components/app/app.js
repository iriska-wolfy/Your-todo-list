import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import TasksList from "../tasks-list/tasks-list";
import TaskAddForm from "../task-add-form/task-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Laundry",
          priority: 1,
          increase: false,
          favorite: true,
          id: 1,
        },
        {
          name: "Shopping",
          priority: 2,
          increase: true,
          favorite: false,
          id: 2,
        },
        {
          name: "Cleaning",
          priority: 3,
          increase: false,
          favorite: false,
          id: 3,
        },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex((elem) => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);

      // const newArr = [...before, ...after];

      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, priority) => {
    const newItem = {
      name,
      priority,
      increase: false,
      favorite: false,
      id: this.maxId++,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  // onToggleIncrease = (id) => {
  //   // this.setState(({ data }) => {
  //   //   const index = data.findIndex((elem) => elem.id === id);

  //   //   const old = data[index];
  //   //   const newItem = { ...old, increase: !old.increase };
  //   //   const newArr = [
  //   //     ...data.slice(0, index),
  //   //     newItem,
  //   //     ...data.slice(index + 1),
  //   //   ];

  //   //   return {
  //   //     data: newArr,
  //   //   };
  //   // });

  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, increase: !item.increase };
  //       }
  //       return item;
  //     }),
  //   }));
  // };

  // onToggleRise = (id) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, favorite: !item.favorite };
  //       }
  //       return item;
  //     }),
  //   }));
  // };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchToDo = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "favorite":
        return items.filter((item) => item.favorite);
      case "prioritised":
        return items.filter((item) => item.priority < 2);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const counterAll = this.state.data.length;
    const counterPrioritised = this.state.data.filter(
      (item) => item.increase
    ).length;
    const visibleData = this.filterPost(this.searchToDo(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          counterAll={counterAll}
          counterPrioritised={counterPrioritised}
        />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <TasksList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <TaskAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
