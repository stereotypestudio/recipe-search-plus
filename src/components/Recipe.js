import React from 'react';
import {Link} from 'react-router-dom';

const API_KEY = "9f75fe27c7598a4a4bde827ad8f31266";

class Recipe extends React.Component {
    state = { 
        activeRecipe: []
     }

     componentDidMount = async () => {
        const title = this.props.location.state.recipe;
        const req = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`);
    
        const res = await req.json();
        this.setState({activeRecipe: res.recipes[0]});
        console.log(this.state.activeRecipe);
     }
    render() { 
        const recipe = this.state.activeRecipe;
        return ( 
            <div>
                <header className="App-header">
                    <h1 className="App-title">Recipe Search</h1>
                </header>
                <div className = "container">
                { this.state.activeRecipe.length !== 0 &&
                    <div >
                        <div className = "row">
                            <div className = "col-md-5">
                                <img className = "active-recipe__img" src = {recipe.image_url} alt = {recipe.title} />
                            </div>
                            <div className = "col-md-7">
                                <h3 className = "active-recipe__title">{recipe.title}</h3>
                                <h4 className = "active-recipe__publisher">Pubisher: <span>{recipe.publisher}</span></h4>
                                <p className = "active-recipe__website">
                                    Website: <span><a href = {recipe.publisher_url}>{recipe.publisher_url}</a></span>
                                </p>
                                <p className = "active-recipe__website">Recipe page: <span><a href = {recipe.source_url}>Details</a></span></p>
                                <button className = "active-recipe__button">
                                    <Link to = "/">Go Home</Link>
                                </button>
                            </div>
                        </div>
                    </div>

                }
                </div>
            </div>
         );
    }
}
 
export default Recipe;