import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../../actions';
import Menu from '../../Menu';
import StudioSearchSort from './StudioSearchSort';
import StudioSelectionList from './StudioSelectionList';
import StudioListWatch from './StudioListWatch';
import StudioListTier from './StudioListTier';
import { store } from '../../../store';
import { Navigate } from "react-router-dom";
import { CreateSelectionList } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioList(props) {
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }
  var auth =  props.auth;

  var list = props.list;

  var next = props.next;
  
  var created = props.created;

  var selection_list = props.selection_list;

  if (auth === true) {

    if (created === true) {
      return (
        <Navigate to="/home" />
      )
    }  else  if (next === false) {
      return (
        <Navigate to="/studio" />
      )
    }
    else if (next === true) {

      if (selection_list === null) {
        store.dispatch(CreateSelectionList(list.lenses))    

        return (
          <div id='studiolist' style={{backgroundImage: `url('/images/background.png')`}}>
            <Menu></Menu>
          </div>
        )
      } else {
        return (
          <div id='studiolist' className="studiolist" style={{backgroundImage: `url('/images/background.png')`}}>
            <Menu></Menu>
    
            <div className="studiolist__selection">

              <a href="/studio" className="studiolist__selection__reset">reset</a>

              <Container fluid>
                <Row>
                  <Col md={3}>

                    <StudioSearchSort></StudioSearchSort>

                  </Col>

                  <Col md={3}>
                    <StudioSelectionList></StudioSelectionList>

                  </Col>

                  <Col md={6}>

                    {list.type === 'watch'?
                      <StudioListWatch></StudioListWatch>  
                      :<StudioListTier></StudioListTier>
                    }

                  </Col>


                </Row>
              </Container>


            </div>



    
          </div>
        )
      }
    }


  } else {
    return (
      <Navigate to="/studio" />
    )
  }


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
    list: state.list,
    next: state.next,
    selection_list: state.selection_list,
    created: state.created
  }
}

export default connect(
  mapStateToProps
)(StudioList);

