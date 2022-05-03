import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupFormModal";
import LoginForm from "./components/LoginFormModal"
import * as sessionActions from "./store/session";
// import * as storyActions from "./store/stories";
import Navigation from "./components/Navigation";
import './App.css';
import Homepage from "./components/Homepage";
import StoryFormPage from "./components/StoryFormPage";
import StoryList from "./components/StoryList";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(storyActions.getStories())
    dispatch(getStories())
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
          <Route path="/stories/:userId">
            <StoryFormPage />
          </Route>
          <Route path="/stories">
            <StoryList />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
