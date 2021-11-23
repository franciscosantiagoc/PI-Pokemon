import './App.css';
import './Components/normalize.css'
import { Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing.jsx';
import Home from './Components/Home.jsx';
import Detail from './Components/Detail.jsx';
import NotFound from './Components/NotFound.jsx';
import Registro from './Components/PokeRegistro.jsx';


function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route exact path='/detail/:idPokemon' component={Detail}/>
        <Route exact path='/home' component={Home}  />
        <Route exact path='/registro' component={Registro}  />
        <Route exact path='/' component={Landing}  />
        <Route path='/' component={NotFound}  />
        
      </Switch>
      

    </div>
  );
}

export default App;
