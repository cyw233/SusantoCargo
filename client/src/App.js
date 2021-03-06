import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from "react-redux";
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/dashboard/Dashboard';
// import Profiles from "./components/profiles/Profiles";
// import Profile from "./components/profile/Profile";
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import UpdateInfo from "./components/update-info/UpdateInfo";
import Shippings from "./components/shippings/Shippings";
import ShippingStatus from "./components/shippings/ShippingStatus";
import AckForm from "./components/shippings/AckForm";
import ResetPassword from './components/update-info/ResetPassword';


import "./App.css";



// To avoid that when we refresh the page, the user's auth will loss, we add the code below:
// check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile 
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/profiles" component={Profiles} /> */}
              {/* <Route exact path="/profile/:handle" component={Profile} /> */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/update-info" component={UpdateInfo} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-shipping" component={Shippings} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/view-status/:shippingId" component={ShippingStatus} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-ack/:shippingId" component={AckForm} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/reset-password" component={ResetPassword} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>  
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
