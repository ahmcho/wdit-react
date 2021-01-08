import './App.css';
import Landing from './containers/Landing';
import NavBar from './components/NavBar';
import About from './containers/About';
import MyAccount from './containers/MyAccount';
import Login from './containers/Login';
import Trip from './containers/Trip';
import Register from './containers/Register';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/auth";
import {getTrips} from './actions/trips';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


if (localStorage.token) {
  const token = localStorage.token;
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getTrips());
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}
const  App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={MyAccount} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/trips/:tripId" component={Trip} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
