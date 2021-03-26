//== NPM imports
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//== Local imports
import './App.scss';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';

const App = () => {
  return (
    <Router>
    <div className="App">
     <Switch>
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={SignUp} />
       <Route exact path="/" component={Home} />
     </Switch>
    </div>
    </Router>
  );
}

export default App;
