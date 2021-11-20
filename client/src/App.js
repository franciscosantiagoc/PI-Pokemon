import './App.css';
import './Components/normalize.css'
import { Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing.jsx';
import Home from './Components/Home.jsx';

function App() {
  return (
    <div className="App">
      {/* <Route path='/' render={() => <Nav  onSearch={onSearch}  />} /> */}
      
      <Switch>
        <Route path='/about'/* component={About} */ />
        <Route path='/home' component={Home}  />
        <Route path='/' component={Landing}  />
        
      </Switch>
      

    </div>
  );
}

export default App;
