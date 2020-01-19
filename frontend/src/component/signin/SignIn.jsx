import React, {Component} from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from './../../firebase';
import Home from './../../component/home/Home';

import './../../stylesheets/SignIn.css';

class SignIn extends Component {
   render() {
      const {
         user,
         signOut,
         signInWithGoogle,
      } = this.props;
      return (
         <React.Fragment>
            <img src="" class="f1"/>
            <img src="RHr2.png" class="f2"/>
            <img src="RHr3.png" class="f3"/>
            <img src="RHr4.png" class="f4"/>

            {
            user 
               ? <Home/>
               : <div className="sign-in-page"><h1 id="sign-in-header">UClassRoom</h1><p className="sign-in-title">Login with Google</p></div>
            }
            {
            user
               ? <button onClick={signOut}>Sign out</button>
               : <button className="login" onClick={signInWithGoogle}>Sign in with Google</button>
            }
         </React.Fragment>
      );
   }
}

const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(SignIn);