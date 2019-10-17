import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pagines from './Componentes/Pagines';
import Anime from './Componentes/Anime';
import Capitule from './Componentes/Capitule';



function App() {

  return (

    <Router>
        <Switch>
          <Route exact path= "/animes/:id/episode/:id2" component = {Capitule} />
          <Route exact path= "/animes/:id" component = {Anime} />
          <Route path= "/" component= {Pagines}/>


        </Switch>  
    </Router>
  );
}

export default App;
