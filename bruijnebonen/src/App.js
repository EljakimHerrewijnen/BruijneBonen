import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import database from './Database.js';

class Recipie{
  constructor(ID, Naam, Recept, MaaltijdType, GerechtType, Afbeelding, Beschrijving){
    this.ID = ID;
        this.Naam = Naam;
        this.Recept = Recept;
        this.MaaltijdType = MaaltijdType;
        this.GerechtType = GerechtType;
        this.Afbeelding = Afbeelding;
        this.Beschrijving = Beschrijving;
        this.KorteBeschrijving = Beschrijving.substring(0, 250) + "...";
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
      downloaded: false,
      recipies: [],
      currentRecipie: null
    };
    this.GoToRecipie = this.GoToRecipie.bind(this);
    this.tempfunc = this.tempfunc.bind(this);
    this.RenderRecipie = this.RenderRecipie.bind(this);
  }

  tempfunc(){

  }

  WriteData(download, newrecipies, downloaded){
    this.setState({
      downloading: download,
      downloaded : downloaded,
      recipies: newrecipies
    })
  }

  GoToRecipie(recipie){
    this.setState({
      currentRecipie: recipie
    });
    console.log(recipie)
  }

  RenderTool(tool){
    return(
      <li>{tool}</li>
    )
  }

  getData(){
    if(this.state.downloaded === true){
      return;
    }
    var db = database.database();
    var leadsRef = db.ref('/');
    var receptItems = [];

    leadsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var temp = childSnapshot.toJSON();
        var toolset = temp['Toolset'].split("|");
        var ingredienten = temp['Ingredienten'].split("|");
        var recept = new Recept(toolset, ingredienten, temp['Bereiding']);
        var receptItem = new Recipie(0, temp['Naam'], recept, temp['MaaltijdType'], temp['GerechtType'], temp['Afbeelding'], temp['Beschrijving']);
        receptItems.push(receptItem);
        receptItems.push(receptItem);
      });
    });

    function check(recepies, callback){
      if(recepies.length <= 0){
        setTimeout(function(){check(receptItems, callback)}, 300);
      }
      else{
        callback(false, recepies, true);
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
        <p className="RecipieItemParagraph">{recipie.KorteBeschrijving}</p>
        <button className="RecipieButton" onClick={()=>this.GoToRecipie(recipie)}>Ga naar Recept</button>
      </div>
    )
  }

  RenderSpecificRecipie(recipie){
    return(
      <div className="SelectedRecipie">
        <h1>{recipie.Naam}</h1>
        <img className="SelectedRecipiePicture" src={recipie.Afbeelding} />
        <p className="SelectedRecipieParagraph">
          {recipie.Beschrijving}
        </p>
        <h3>Benodigheden</h3>
        <p className="SelectedRecipieToolset">
          {recipie.Recept.Toolset.map((tool, i)=>{
            return (
              <li>{tool}</li>
            )})}
        </p>
        <h3>Ingredienten</h3>
        <p className="SelectedRecipieIngredienten">
          {recipie.Recept.Ingredienten.map((ingredient, i)=>{
            return (
              <li>{ingredient}</li>
            )})}
        </p>
        <h3>Bereiding</h3>
        <p>{recipie.Recept.Bereiding}</p>
      </div>
    )
  }

  RenderLayout(){
    return(
        <div className="AppBalk">
          <img src="csfrLogo.ico" className="AppBalkLogo" alt="logo" />
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

    if(this.state.currentRecipie !== null){
      return(
        <div>
          {this.RenderLayout()}
          {this.RenderSpecificRecipie(this.state.currentRecipie)}
        </div>
      )
    }

    var rows = this.state.recipies;
    return(
        <div>
        {this.RenderLayout()}
        {rows.map(this.RenderRecipie)}
        </div>
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