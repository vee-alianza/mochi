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
import StoryList from "./components/StoryList";
import './App.css';
import CommentForm from "./components/CommentForm";

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
          <Route path="/stories">
            <StoryList />
          </Route>
          <Route path="/comments">
            <CommentForm />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
