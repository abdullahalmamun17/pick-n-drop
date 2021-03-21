import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import './Login.css'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { UserContext } from '../../App'
import { handleGoogleSignIn, handleFacebookSignIn, initializeLoginFramework } from './loginManager'
import firebase from "firebase/app";
import "firebase/auth";


const Login = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  initializeLoginFramework()


  const onSubmit = data => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoggedInUser(user);
        history.replace(from)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorMessage)
        console.log(errorCode, errorMessage);
      });
  }


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(result => {
        setLoggedInUser(result)
        history.replace(from)
      })
      .catch(error => {
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  const facebookSignIn = () => {
    handleFacebookSignIn()
      .then(result => {
        setLoggedInUser(result)
        history.replace(from)
      })
      .catch(error => {
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form bg-light px-4">
          <h3 className="mb-4">Login</h3>
          <input name="email" placeholder="Email" className="d-block my-2 w-100 rounded border-0 p-2" ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            }
          })} />
          {errors.email && <span style={{ color: 'red' }}>Email is required</span>}
          <input name="password" type="password" placeholder="Password" className="d-block my-2 w-100 rounded border-0 p-2" ref={register({ required: true, minLength: 6 })} />
          {errors.password?.type === 'required' && <span style={{ color: 'red' }}>Password is required</span>}
          {errors.password?.type === 'minLength' && <span style={{ color: 'red' }}>Use 8 characters or more for your password</span>}
          {errorMsg && <span style={{ color: 'red' }}>{errorMsg}</span>}
          <Link className="d-block">Forgot Password?</Link>
          <div className="d-flex align-items-center">
            <input type="checkbox" />
            <span className="ml-2 my-2">Remember Me</span>
          </div>
          <input className="d-block w-100 btn btn-primary" type="submit" value="Login" />
          <p className="mt-2">Don't have an account? <Link to="/signup">Create Account</Link></p>
        </form>
      </div>
      <div className="text-center mt-3 pb-5">
        <p>Or Login Using</p>
        <div onClick={googleSignIn} className="mx-auto d-flex justify-content-between align-items-center mb-2 bg-light" style={{ width: '300px', height: '50px', border: '1px solid gray', borderRadius: '30px', cursor: 'pointer' }}>
          <FcGoogle style={{ fontSize: '50px' }} />
          <p className="m-0 mr-5">Continue With Google</p>
        </div>
        <div onClick={facebookSignIn} className="mx-auto d-flex justify-content-between align-items-center bg-light" style={{ width: '300px', height: '50px', border: '1px solid gray', borderRadius: '30px', cursor: 'pointer' }}>
          <FaFacebook style={{ fontSize: '50px', color: '#1877f2' }} />
          <p className="m-0 mr-5">Continue With Facebook</p>
        </div>
      </div>
    </Container>
  );
}

export default Login;