import React, { useState, useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            ...currentUser,
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(currentUser);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact component={Homepage} path="/"></Route>
        <Route component={ShopPage} path="/shop"></Route>
        <Route component={SignInAndSignUpPage} path="/signin"></Route>
      </Switch>
    </div>
  );
}

export default App;
