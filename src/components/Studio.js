import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../actions';
import { SetListType } from '../actions';
import { SetListContent } from '../actions';
import Menu from './Menu';
import Studio_Filters from './Studio_Filters';
import Studio_TypeContent from './Studio_TypeContent';
import Studio_Lens from './Studio_Lens';
import { store } from '../store';
import "../icon/font/flaticon_lens.scss";
import "../scss/studio.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Studio(props) {

  console.log(props.filters)
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  function setType(type) {
    store.dispatch(SetListType(type))
  }

  function setContent(uri,content) {
    store.dispatch(SetListContent(uri,content))
  }

  var list = props.list;

  var auth =  props.auth;
  
  if (auth === true) {

    return (
      <div id='studio' className="studio" style={{backgroundImage: `url('/images/background.png')`}}>
      <Menu></Menu>

        <div className="studio__lens">

          <Container fluid>
            <Row>
              <Col md={2}>

                <div className="studio__lens__wide">
                  <Studio_TypeContent></Studio_TypeContent>
                </div>

              </Col>

              <Col md={1}></Col>

              <Col md={2}>

                <div className="studio__lens__medium">

                    <Studio_Filters></Studio_Filters>

                  </div>

              </Col>

              <Col md={1}></Col>

              <Col md={3}>

                <div className="studio__lens__narrow">

                  <Studio_Lens></Studio_Lens>

                </div>

              </Col>
            </Row>
          </Container>

        </div>
      </div>
    )

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
    filters: state.filters
  }
}

export default connect(
  mapStateToProps
)(Studio);

