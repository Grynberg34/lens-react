import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import { CheckMenu } from '../../actions';
import Menu from '../Menu';
import StudioFilters from './Filters/StudioFilters';
import StudioTypeContent from './Lens/StudioTypeContent';
import StudioFilterSelect from './Filters/StudioFilterSelect';
import StudioLens from './Lens/StudioLens';
import StudioNext from './Lens/StudioNext';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studio.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      } else {
        return (
          <div id='studio' className="studio" style={{backgroundImage: `url('/images/background.png')`}}>
          <Menu></Menu>
    
            <div className="studio__create">
  
              <a href="/studio" className="studio__create__reset">reset</a>
    
              <Container fluid>
                <Row>
                  <Col md={2}>
    
                    <div className="studio__create__section">
                      <StudioTypeContent></StudioTypeContent>
                    </div>
    
                  </Col>
    
                  <Col md={1}></Col>
    
                  <Col md={2}>
    
                  {(list.type !==null && list.content !== null)?
                    <div className="studio__create__section">
                      <StudioFilters></StudioFilters>
                    </div>
                  :null
                  }
    
    
                  </Col>
    
                  <Col md={2}>
    
                    {(list.type !==null && list.content !== null)?
                    <div className="studio__create__section">
                      <StudioFilterSelect></StudioFilterSelect>
                    </div>
                    :null
                    }
    
                  </Col>
    
                  <Col md={3}>
    
                    {(list.type !==null && list.content !== null)?
                    <div className="studio__create__section">
                      <StudioLens></StudioLens>
                    </div>
                    :null
                    }
    
                  </Col>
    
                  <Col md={2}>
    
                    {(list.type !==null && list.content !== null)?
                    <div className="studio__create__section">
                    <StudioNext></StudioNext>
                    </div>
                    :null
                    }
    
                  </Col>
    
    
                </Row>
              </Container>
    
            </div>
          </div>
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

