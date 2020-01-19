import React, {useEffect} from 'react'
import RecipeCard from '../RecipeCard/RecipeCard';
import {Link} from 'react-router-dom';
import './Landing.scss';

function Landing(props) {
    const {recipe} = props;
    useEffect(() => {}, []);

    return (
        <div className = 'container'>
            {recipe && (
                <Link to = {`/recipes/${recipe.idMeal}`}>
                    <RecipeCard recipe = {recipe} id = {recipe.idMeal} />
                </Link>
            )}
        </div>
    );
}


export default Landing;