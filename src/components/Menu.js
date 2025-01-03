import React from 'react';
import { connect } from 'react-redux';
import { store } from '../store';
import { NavLink, Link } from "react-router-dom";
import { LogoutUser } from '../actions';
import "../scss/menu.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Menu(props) {

  function logout() {
    store.dispatch(LogoutUser())
  }

  var menu = props.menu;
  
  return (
    <div id="menu" className="menu">
      <Container fluid>
        <Row>

          <Col md={2}>
            {
              menu === true ?
              <NavLink to="/home"><img src="/images/logo/logo.png" className="menu__logo" alt="" /></NavLink>
              : <NavLink to="/home"><img src="/images/logo/logo2.png" className="menu__logo" alt="" /></NavLink>
            }
          </Col>

          <Col md={6}>

          </Col>

          <Col md={1}></Col>

          <Col md={1}>
            <NavLink to='/home' className="menu__link">home</NavLink>
          </Col>

          <Col md={1}>
            <NavLink to='/studio' className="menu__link">studio</NavLink>
          </Col>

          <Col md={1}>
            <button className="menu__button" onClick={logout}>logout</button>
          </Col>
        </Row>
      </Container>
    </div>
  )


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
)(Menu);

