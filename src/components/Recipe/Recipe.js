import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function Recipe() {
    const {id} = useParams()
    const [current, setCurrent] = useState({})


    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => setCurrent(res.data.meals[0]))
    }, [id])
    return (
        <div className = "cardContainer">
            {current &&
            <div>
                <h2>{current.strMeal}</h2>
                <p>{current.strCatagory}</p>
                {current.strYoutube ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${current.strYoutube.split("=")[1]}`} title={current.strMeal} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : <img src={current.strMealThumb} alt={current.strMeal}/> }

                <p>{current.strInstructions}</p>
            </div>
            }
        </div>
    )
}

export default Recipe;