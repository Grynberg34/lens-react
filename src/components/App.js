import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../scss/app.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App(props) {

  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  if (auth === true) {
    return (
      <Navigate to="/studio" />
    )
  } else {
    return (
      <div id='home' className="home" style={{backgroundImage: `url('/images/background.png')`}}>
        
        <Container fluid>
          <Row>
            <Col md={4}></Col>

            <Col md={4}>
             <img className="home__logo" src="/images/logo/logo.png" alt="" />
             <Container fluid>
                <Row>

                  <Col md={6}>
                    <Link className='home__link' to="/register">register</Link>
                  </Col>

                  <Col md={6}>
                    <Link className='home__link' to="/login">login</Link>
                  </Col>

                </Row>
             </Container>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    jwt: state.jwt
  }
}

export default connect(
  mapStateToProps
)(App);
