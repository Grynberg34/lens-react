import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import { CheckMenu } from '../../actions';
import StudioTypeContent from './StudioTypeContent';
import StudioCreate from './StudioCreate';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studio.scss";

function Studio(props) {
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  var list = props.list;

  var next = props.next;

  var menu = props.menu;

  if (menu === false) {
    store.dispatch(CheckMenu('yellow'))
  }


  if (props.jwt !== null && auth === false) {
    return (
      null
    )
  } else {
    if (auth === true) {
  
      if (next === true) {
        return (
          <Navigate to="/studio/list" />
        )
      } else if (list.type === null || list.content === null) {
        return (
          <StudioTypeContent></StudioTypeContent>
        ) 
      } else {
        return (
          <StudioCreate></StudioCreate>
        )
      }
  
  
    } else {
      return (
        <Navigate to="/" />
      )
    }
  }
  


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
    list: state.list,
    filter: state.filter,
    next: state.next,
    created: state.created,
    menu: state.menu
  }
}

export default connect(
  mapStateToProps
)(Studio);

