import React from "react";
import MainPage from "./MainPage.jsx";
// import SignIn from "./SignIn.jsx"
//import firebase from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA6V10s47nKkBakTxMupMXA4VaRyIpI0Xs",
  authDomain: "findfi-15087.firebaseapp.com",
  projectId: "findfi-15087",
  storageBucket: "findfi-15087.appspot.com",
  messagingSenderId: "418885153057",
  appId: "1:418885153057:web:1d6a636b046e3047910e60",
  measurementId: "G-E8PC4ZWM9X",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore();
// const database = getDatabase(app);
const Div = styled.div`
&&& {
  background: black;
  min-width: 100%;
  min-height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}
`;

const App = () => {
  const [user] = useAuthState(auth);
  //box-sizing:border-box !important;


  return <Div>{user ? <MainPage auth={auth} firestore={firestore}/> : <SignIn />}</Div>;
};

export default App;
const Styledh1 = styled.h1`
&&& {
  color: blue;
  margin: 0px !important;
  padding: 0px !important;
  position: relative;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 200px;
  transition: all 0.4s ease 0s;
  text-align: center;
}
`;

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  //style="background-color: #508bfc;"}
  return (
    <>
      <Styledh1>Find-Fi</Styledh1>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" for="typeEmailX-2">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" for="typePasswordX-2">
                      Password
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" for="form1Example3">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>

                  <button
                    className="btn btn-lg btn-block btn-primary"
                    // style="background-color: #dd4b39"
                    type="submit"
                    onClick={signInWithGoogle}
                  >
                    <i className="fab fa-google me-2"></i> Sign in with google
                  </button>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-2"
                    // style="background-color: #3b5998"
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i>Sign in with
                    facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
/* <hr className="my-4"> */
//style="border-radius: 1rem;"
