import React, {useState} from 'react'
import Recipe from '../Recipe/Recipe';
import axios from 'axios';

function SearchBar(props) {
    const [strMeal, setStrMeal] = useState('');


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
        .get(`https://www.themealdb.com/api/json/v1/1/random.php/?i=${strMeal}`)
        .then((res) => res.data.strMeal)
        .catch((err) => console.log(err));
    }


    return (
        <form onSubmit = {(e) => onSubmitHandler(e)}>
                <input type = 'text' onChange = {(e) => setStrMeal(e.target.value)} value = {Recipe.strMeal} placeholder = 'recipe'/>
                <button type = 'submit'>Search</button>
        </form>
    )
}



export default  SearchBar;