import React, { useEffect } from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);
  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact component={Homepage} path="/"></Route>
        <Route component={ShopPage} path="/shop"></Route>
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
