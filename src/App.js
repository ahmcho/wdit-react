import './App.css';
import Landing from './containers/Landing';
import NavBar from './components/NavBar';
import About from './containers/About';
import MyAccount from './containers/MyAccount';

// import { Provider } from 'react-redux';
// import store from './store';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const  App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <MyAccount />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
