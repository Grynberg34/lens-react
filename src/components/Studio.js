import React from 'react';
import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import Menu from './Menu';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import "../scss/studio.scss";

function Studio(props) {
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;
  
  if (auth === true) {

    return (
      <div id='studio' className="studio" style={{backgroundImage: `url('/images/background.png')`}}>
      <Menu></Menu>
      </div>
    )

  } else {
    return (
      <Navigate to="/login" />
    )
  }


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
  }
}

export default connect(
  mapStateToProps
)(Studio);

