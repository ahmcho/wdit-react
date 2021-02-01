import Landing from './containers/Landing';
import NavBar from './components/NavBar';
import About from './containers/About';
import MyAccount from './containers/MyAccount';
import Login from './containers/Login';
import Trip from './containers/Trip';
import Register from './containers/Register';
import NotFound from './containers/NotFound';
import Forgot from './containers/Forgot';
import Reset from './containers/Reset';
import Public from './routers/Public';
import Private from './routers/Private';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/auth";
import { startLoading, stopLoading } from './actions/ui';
import {getTrips} from './actions/trips';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'fontsource-roboto';

const fetchTrips = async () => {
  store.dispatch(startLoading());
  await store.dispatch(getTrips())
  store.dispatch(stopLoading());
} 

if (localStorage.token) {
  const token = localStorage.token;
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  fetchTrips();
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}


const  App = () => {
  return (
    <SnackbarProvider preventDuplicate maxSnack={1}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
              <Private exact path="/" component={Landing} />
              <Route path="/about" component={About} />
              <Private path="/dashboard" component={MyAccount} />
              <Public path="/register" component={Register} />
              <Public path="/login" component={Login} />
              <Public path="/forgot" component={Forgot} />
              <Private path="/trips/:tripId" component={Trip} />
              <Public path="/reset/:token" component={Reset} />
              <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
