import React from 'react';
import RedefineForm from './RedefineForm';
import NewPassForm from './NewPassForm';
import { RedefinePassword } from '../actions';
import { DefineNewPassword } from '../actions';
import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import { store } from '../store';
import { Link, Navigate } from "react-router-dom";

function Redefine(props) {

  function submitEmail (values) {

    store.dispatch(RedefinePassword(values));

  }

  function submitNewPassword (values) {

    store.dispatch(DefineNewPassword(values));

  }

  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;
  
  var redefine = props.redefine;

  var newpass = props.newpass;

  if (auth === true) {
    return (
      <Navigate to="/user" />
    )
  } else if (newpass === true) {
    return (
      <div>
        <h1>New password created</h1>
        <Link to="/login">Login</Link>
    </div>
    )
  } else if (redefine === true){
    return (
      <div>
        <span id={props.newpass.toString()}></span>
        <h1>{props.failNewpass}</h1>
        <NewPassForm   onSubmit={submitNewPassword}  />
      </div>
    )

  } else {

    return (
      <div>
        <h1>{props.failRedefine}</h1>
        <RedefineForm onSubmit={submitEmail} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    jwt: state.jwt,
    redefine: state.redefine,
    failRedefine: state.failRedefine,
    newpass: state.newpass,
    failNewpass: state.failNewpass
  }
}

export default connect(
  mapStateToProps
)(Redefine);

