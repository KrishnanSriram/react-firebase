import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Message, Container, Button, Image } from 'semantic-ui-react';

firebase.initializeApp({
  apiKey: "****************-62y**********",
  authDomain: "fir-auth-react-********",
  databaseURL: "https://*****************",
  projectId: "fir-auth-************",
  storageBucket: "fir-auth-react-***********",
  messagingSenderId: "************"
});

class App extends Component {
  state = {isSignedIn: false};
  uiconfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callback: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        user: user
      });
      console.log(user.photoURL);
    })
  }

  SignedIn = () => {
    return(
      <Container>
        <Message>
          <Message.Header>{firebase.auth().currentUser.displayName}</Message.Header>
          <p>
            You are now logged into the application. Will shortly show your profile information. Please sit tight
          </p>
        </Message>
        <Image src={this.state.user.photoURL} />
        <div>
          <Button primary onClick={() => firebase.auth().signOut()}>Signout</Button>
        </div>
      </Container>
    )
  }

  SignInNow = () => {
    return (
      <StyledFirebaseAuth uiConfig = {this.uiconfig} firebaseAuth={firebase.auth()} />
    )
  }

  NotSignedIn = () => {
    return (
      <Message negative>
        <Message.Header>We're sorry, You are not authenticated</Message.Header>
        <p>Failed to login to the application. Either somerthing went wrong or you are in the wrong location. Please click on login to continue</p>
      </Message>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (<this.SignedIn/>) : (<this.SignInNow/>)}
      </div>
    );
  }
}

export default App;
