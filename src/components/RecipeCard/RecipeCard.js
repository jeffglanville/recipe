import React from 'react'

function RecipeCard(props) {
    const {recipe} = props;

    return (
        <div className = 'recipeCard'>
            <h2>Recipe Card</h2>
            {recipe && (
                <div>
                    <h2>{recipe.strMeal}</h2>
                    <img src = {recipe.strMealThumb} alt = ""/>
                </div>
            )}
        </div>
    );
}


export default  RecipeCard