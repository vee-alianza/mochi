import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupFormModal";
import LoginForm from "./components/LoginFormModal"
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './App.css';
import Homepage from "./components/Homepage";
import StoryFormPage from "./components/StoryFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main__page">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
        </Switch>
      )}
    </div>
  );
}

export default App;
