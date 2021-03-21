import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { handleFacebookSignIn, handleGoogleSignIn, initializeLoginFramework } from "../Login/loginManager";
import { UserContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";


const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState('')
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory()
  const location = useLocation()

  const { from } = { from: { pathname: "/" } };


  initializeLoginFramework()

  const onSubmit = data => {
    if (data.password === data.confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          const user = result.user;
          updateProfile(user, data.name)
          history.replace('/login')
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    else {
      setErrorMsg(`password didn't match`)
    }
  };

  const updateProfile = (user, name) => {
    user.updateProfile({
      displayName: name,
      photoURL: ""
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      console.log(error);
    });
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(result => {
        setLoggedInUser(result)
        history.replace(from)
      })
  }
  const faceboookSignIn = () => {
    handleFacebookSignIn()
      .then(result => {
        setLoggedInUser(result)
        history.replace(from)
      })
  }

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form px-5 mt-2 border-0 bg-light">
          <h3 className="mb-4">Create an account</h3>
          <input name="name" placeholder="Name" className="d-block my-3 w-100 rounded border-0 p-2" ref={register({ required: true })} />
          {errors.name && <span style={{ color: 'red' }}>Name is required</span>}
          <input name="email" placeholder="Email" className="d-block my-3 w-100 rounded border-0 p-2" ref={register({
            required: true, pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            }
          })} />
          {errors.email?.message && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          {errors.email?.type === 'required' && <span style={{ color: 'red' }}>Email is required</span>}
          <input name="password" type="password" placeholder="Password" className="d-block my-3 w-100 rounded border-0 p-2" ref={register({ required: true, minLength: 6 })} />
          {errors.password?.type === 'required' && <span style={{ color: 'red' }}>Password is required</span>}
          {errors.password?.type === 'minLength' && <span style={{ color: 'red' }}>Use 8 characters or more for your password</span>}
          <input name="confirmPassword" type="password" placeholder="Confirm Password" className="d-block my-3 w-100 rounded border-0 p-2" ref={register({ required: true, minLength: 6 })} />
          {errors.confirmPassword?.type === 'required' && <span style={{ color: 'red' }}>Password is required</span>}
          {errors.confirmPassword?.type === 'minLength' && <span style={{ color: 'red' }}>Use 8 characters or more for your password</span>}
          {errorMsg && <span style={{ color: 'red' }}>{errorMsg}</span>}
          <input className="d-block w-100 btn btn-primary" type="submit" value="Login" />
          <h5 className="mt-2">Already have an account? <Link to='/login'>Login</Link></h5>
        </form>
      </div>
      <div className="text-center mt-2 pb-2">
        <p>Or Login Using</p>
        <div onClick={googleSignIn} className="mx-auto d-flex justify-content-between align-items-center mb-2 bg-light" style={{ width: '300px', height: '50px', border: '1px solid gray', borderRadius: '30px', cursor: 'pointer' }}>
          <FcGoogle style={{ fontSize: '50px' }} />
          <p className="m-0 mr-5">Continue With Google</p>
        </div>
        <div onClick={faceboookSignIn} className="mx-auto d-flex justify-content-between align-items-center bg-light" style={{ width: '300px', height: '50px', border: '1px solid gray', borderRadius: '30px', cursor: 'pointer' }}>
          <FaFacebook style={{ fontSize: '50px', color: '#1877f2' }} />
          <p className="m-0 mr-5">Continue With Facebook</p>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;