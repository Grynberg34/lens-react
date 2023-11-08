import React from 'react';
import RegisterForm from './RegisterForm';
import { RegisterUser } from '../../actions';
import { CheckAuth } from '../../actions';
import { AuthGoogle } from '../../actions';
import { connect } from 'react-redux';
import { store } from '../../store';
import { Link, Navigate } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import "../../scss/register.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register(props) {

  function submit (values) {

    store.dispatch(RegisterUser(values));

  }

  const responseGoogle = (response) => {

    store.dispatch(AuthGoogle(response));

  }  

  if (props.jwt !== null) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;
  var register = props.register;

  if (auth === true) {
    return (
      <Navigate to="/home" />
    )
  } else if (register === true) {
    return (
      <Navigate to="/login" />
    )
  } 
  else {

    return (
      <div id='register' className="register" style={{backgroundImage: `url('/images/background.png')`}}>
        <Container fluid>
          <Row>
            <Col md={4}></Col>

            <Col md={4}>
              <Link to="/"><img className="register__logo" src="/images/logo/logo.png" alt="" /></Link>
              <h1 className="register__msg">{props.failRegister}</h1>
              <RegisterForm onSubmit={submit} />
              <GoogleLogin
                className='register__google'
                clientId= "668527435235-mtprvqmvk6tcgrvfj14d42tgetucjrto.apps.googleusercontent.com"
                buttonText="Register with Google Account"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                  <button className="register__google" onClick={renderProps.onClick}> <img className="register__google__img" src="/images/google.png" alt=""></img> Register with Google Account</button>
                )}
              />
              <Link className='register__link' to="/login">login</Link>
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
    failRegister: state.failRegister,
    jwt: state.jwt,
    register: state.register
  }
}

export default connect(
  mapStateToProps
)(Register);

