import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import database from './Database.js';

class Recipie{
  constructor(ID, Naam, Recept, MaaltijdType, GerechtType, Afbeelding){
    this.ID = ID;
        this.Naam = Naam;
        this.Recept = Recept;
        this.MaaltijdType = MaaltijdType;
        this.GerechtType = GerechtType;
        this.Afbeelding = Afbeelding
  }
}

class Recept{
  constructor(Toolset, Ingredienten, Bereiding){
    this.Toolset = Toolset;
    this.Ingredienten = Ingredienten;
    this.Bereiding = Bereiding;
  }
}

class App extends Component {
  constructor(props){
    super(props)

    this.WriteData = this.WriteData.bind(this);

    this.state = {
      downloading: true,
      recipies: [],
      currentRecipie: new Recipie()
    };
    this.GoToRecipie = this.GoToRecipie.bind(this);
    this.tempfunc = this.tempfunc.bind(this);
    this.RenderRecipie = this.RenderRecipie.bind(this);
  }

  tempfunc(){

  }

  WriteData(download, newrecipies){
    this.setState({
      downloading: download,
      recipies: newrecipies
    })
  }

  GoToRecipie(recipie){
    console.log("HAYAOAOs")
    this.setState({
      currentRecipie: recipie
    });
    console.log(recipie)
  }

  getData(){
    var db = database.database();
    var leadsRef = db.ref('/');
    var receptItems = [];

    leadsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var temp = childSnapshot.toJSON();
        var recept = new Recept(temp['Toolset'], temp['Ingredienten'], temp['Bereiding']);
        var receptItem = new Recipie(0, temp['Naam'], recept, temp['MaaltijdType'], temp['GerechtType'], temp['Afbeelding']);
        receptItems.push(receptItem);
        receptItems.push(receptItem);
      });
    });

    function check(recepies, callback){
      if(recepies.length <= 0){
        setTimeout(function(){check(receptItems, callback)}, 300);
      }
      else{
        callback(false, recepies);
      }
    }
    check(receptItems, this.WriteData)
  }

  RenderRecipie(recipie){
    console.log(recipie)
    return(
      <div className="RecipieItem">
        <h1>{recipie.Naam}</h1>
        <img className="RecipiePicture" src={recipie.Afbeelding} alt={recipie.Naam}/>
        <button className="RecipieButton" onClick={()=>this.GoToRecipie(recipie)}>Ga naar Recept</button>
      </div>
    )
  }

  RenderLayout(){
    return(
        <div className="AppBalk">
        </div>
    )
  }
    
  componentWillMount(){
    this.getData();
  }

  componentDidMount(){
    let current = this;
  }


  render() {
    
    if(this.state.downloading){
      return (
        <div className="App">
        <header className="App-header">
          <img src="csfrLogo.ico" className="App-logo" alt="logo" />
          <h1 className="App-title">Laden van gerechten...</h1>
        </header>
      </div>
      )
    }

    var rows = this.state.recipies;
    return(
        <div>
        {this.RenderLayout()}
        {rows.map(this.RenderRecipie)}
        </div>
      /*<tbody>
        {
          rows.map(function(recipie){
            return (
              <div className="RecipieItem">
                <img className="RecipiePicture" src={recipie.Afbeelding} alt={recipie.Naam}/>
                <h1>{recipie.Naam}</h1>
              <tr>{recipie.MaaltijdType}</tr>
              <button className="RecipieButton" onClick={()=>{this.GotoRecipie(recipie)}}>Ga naar dit recept</button>
              </div>
            )
          })
        }
      </tbody>*/
    )
  }
}

export default App;


{/*<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>*/}