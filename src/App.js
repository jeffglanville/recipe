import React, {useState, useEffect, Component} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Recipe from './components/Recipe/Recipe';
import {Text, Stylesheet, View, ListView, TextInput, ActivityIndicator, Alert} from 'react-native';
import './App.scss';

class searchRecipe extends Component {
  constructor(props) {
    super(props);
    this.state ={
      isLoading: true,
      text: '',
    }
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then ((res) => res.json())
    .then((resJson) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(resJson),
      }, function() {
        this.arrayholder = resJson;
      });
    })
    .catch((err) => {
      console.log(err)
    });
  }

  GetListViewItem (recipe) {
    Alert.alert(recipe);
  }
  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.recipe.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text:text
    })
  }
  ListViewItemSeparator = () => {
    return (
      <View
      style = {{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
      />
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View
          style = {{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
        </View>
      );
    }
    return(
      <View style = {Stylesheet.MainContainer}>

        <TextInput
        style = {Stylesheet.TextInputStyleClass}
        onChangeText = {(text) => this.SearchFilterFunction(text)}
        value = {this.state.text}
        underlineColorAndroid = 'transparent'
        placeholder =  "Search for recipe"
        />

      <ListView
        dataSource = {this.state.dataSource}
        renderSeparator = {this.ListViewItemSeparator}
    renderRow = {(rowData) => <Text style = {Stylesheet.rowViewContainer} onPress = {this.GetListViewItem.bind(this, rowData.recipe)} >
      {rowData.recipe}</Text> }
      enableEmptySections = {true}
      style = {{marginTop: 10}}
      />
      </View>
    )
  }
}

function App() {
  const [recipe, setRecipe] = useState([])
    useEffect(() => {
      axios
      .get('https://www.themealdb.com/api/json/v1/1/random.php')
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
