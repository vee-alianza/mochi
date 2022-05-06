import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal"
import SignupForm from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import Homepage from "./components/Homepage";
import StoryFormPage from "./components/StoryFormPage"
import StoryView from "./components/StoryView";
import Footer from "./components/Footer";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main__page">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/stories/new">
            <StoryFormPage props={{ edit: false, setShowModal: null, storyId: null }} />
          </Route>
          <Route path="/stories/:id">
            <StoryView />
          </Route>
        </Switch>
      )}
      < Footer />
    </div>
  );
}

export default App;
