import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Recipe from './components/Recipe/Recipe';
import './App.scss';

function App() {
  const [recipe, setRecipe] = useState([])
    useEffect(() => {
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => setRecipe(res.data.meals[0]))
      .catch((err => console.log(err)))
    }, [])
  return (
    <div className="App">
      <Route exact path = "/" component = {Header}/>
      <Route exact path = "/">
        <Landing recipe = {recipe} />
      </Route>
      <Route path = "/recipes/:id">
        <Recipe  />
      </Route>
    </div>
  );
}

export default App;
