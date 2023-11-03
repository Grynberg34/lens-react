import React from 'react';
import RedefineForm from './RedefineForm';
import NewPassForm from './NewPassForm';
import { RedefinePassword } from '../../actions';
import { DefineNewPassword } from '../../actions';
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import { store } from '../../store';
import { Link, Navigate } from "react-router-dom";
import "../../scss/redefine.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
      <Navigate to="/studio" />
    )
  } else if (newpass === true) {
    return (
      <div id='redefine' className="redefine" style={{backgroundImage: `url('/images/background.png')`}}>

        <Container fluid>
          <Row>
            <Col md={4}></Col>

            <Col md={4}>
              <Link to="/"><img className="redefine__logo" src="/images/logo/logo.png" alt="" /></Link>
              <h1 className='redefine__msg'>New password created</h1>
              <Link className="redefine__link" to="/login">Login</Link>
            </Col>
          </Row>
        </Container>
    </div>
    )
  } else if (redefine === true){
    return (
      <div id='redefine' className="redefine" style={{backgroundImage: `url('/images/background.png')`}}> 

        <Container fluid>
          <Row>
            <Col md={4}></Col>

            <Col md={4}>
              <Link to="/"><img className="redefine__logo" src="/images/logo/logo.png" alt="" /></Link>
              <span id={props.newpass.toString()}></span>
              <h1 className='redefine__msg'>{props.failNewpass}</h1>
              <NewPassForm  onSubmit={submitNewPassword}  />
            </Col>
          </Row>
        </Container>
      </div>
    )

  } else {

    return (
      <div id='redefine' className="redefine" style={{backgroundImage: `url('/images/background.png')`}}>
        <Container fluid>
          <Row>
            <Col md={4}></Col>

            <Col md={4}>
              <Link to="/"><img className="redefine__logo" src="/images/logo/logo.png" alt="" /></Link>
              <h1 className='redefine__msg'>{props.failRedefine}</h1>
              <RedefineForm onSubmit={submitEmail} />
            </Col>
          </Row>
        </Container>

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

