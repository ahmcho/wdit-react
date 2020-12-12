import './App.css';
import Landing from './containers/Landing';
import NavBar from './components/NavBar';
import About from './containers/About';
import MyAccount from './containers/MyAccount';
import Login from './containers/Login';
import Register from './containers/Register';

// import { Provider } from 'react-redux';
// import store from './store';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const  App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={MyAccount} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
    </Router>
  );
}

export default App;
