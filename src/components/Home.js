import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import { CheckMenu } from '../actions';
import Menu from './Menu';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import "../icon/font/flaticon_lens.scss";
import "../scss/home.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home(props) {
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  var menu = props.menu;

  if (menu === false) {
    store.dispatch(CheckMenu('yellow'))
  }

  
  if (auth === true) {
    return (
      
      <div id='home' className="home" style={{backgroundImage: `url('/images/background.png')`}}>
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
    menu: state.menu
  }
}

export default connect(
  mapStateToProps
)(Home);

