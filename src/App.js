import { Component } from "react";

import CardList from "./components/card-list/card-list.component";

import "./App.css";
import SearchBox from "./components/search-box/search-box.component";
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            //console.log(users);
          }
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    //console.log(filteredMonsters);

    return (
      <div className="App">
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonsters} />
        {/*<input
          className="search-box"
          type="search"
          placeholder="Search Monsters"
          onChange={onSearchChange}
    /> */}
        {/*
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      */}
      </div>
    );
  }
}

export default App;
