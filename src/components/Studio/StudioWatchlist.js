import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import Menu from '../Menu';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import { CreateSelectionList } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiowatchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudioWatchList(props) {
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  var list = props.list;

  var next = props.next;

  console.log(list.lenses)
  
  if (auth === true) {

    if (next === false) {
      return (
        <Navigate to="/studio" />
      )
    } else {
      return (
        <div id='studiowatchlist' className="studiowatchlist" style={{backgroundImage: `url('/images/background.png')`}}>
        <Menu></Menu>

        <Container fluid>
          <Row>
            <Col md={4}>
              <div className="studiowatchlist__list">

              </div>
            </Col>
          </Row>
        </Container>
  
        </div>
      )
    }


  } else {
    return (
      <div></div>
    )
  }


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
    list: state.list,
    filter: state.filter,
    next: state.next
  }
}

export default connect(
  mapStateToProps
)(StudioWatchList);

