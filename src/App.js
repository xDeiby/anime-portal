import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pagines from './Componentes/Pagines';
import Anime from './Componentes/Anime';



function App() {

  return (

    <Router>
        <Switch>
          <Route exact path= "/animes/:id" component = {Anime} />
          <Route path= "/" component= {Pagines}/>

        </Switch>  
    </Router>
  );
}

export default App;
