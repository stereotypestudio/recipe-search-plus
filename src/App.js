import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';
import LoginButton from './components/LoginButton';

const API_KEY = "9f75fe27c7598a4a4bde827ad8f31266";

class App extends Component {

  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);

    const data = await api_call.json();
    this.setState({recipes: data.recipes});
    console.log(this.state.recipes);
  }

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({recipes: recipes});
  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes)
  }

  render() {
    return (
      <div>
        <header className="App-header" >
          <h1 className="App-title">Recipe Search</h1>
          <LoginButton />
        </header>
        <div style = {{margin: "0 auto", textAlign: "center"}}>
        <Form  getRecipe = {this.getRecipe} />
        </div>
        
        <Recipes recipes = {this.state.recipes} />
      </div>
    );
  }
}

export default App;