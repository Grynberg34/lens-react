import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import Menu from '../Menu';
import StudioSearchSort from './StudioSearchSort';
import StudioMovieInfo from './StudioMovieInfo';
import StudioSelectionList from './StudioSelectionList';
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

  var selection_list = props.selection_list;

  if (auth === true) {

    if (next === false) {
      return (
        <Navigate to="/studio" />
      )
    } else if (next === true && list.type === "watch") {

      if (selection_list === null) {
        store.dispatch(CreateSelectionList(list.lenses))    

        return (
          <div id='studiowatchlist' style={{backgroundImage: `url('/images/background.png')`}}>
            <Menu></Menu>
          </div>
        )
      } else {
        return (
          <div id='studiowatchlist' className="studiowatchlist" style={{backgroundImage: `url('/images/background.png')`}}>
            <Menu></Menu>
    
            <div className="studiowatchlist__selection">

              <a href="/studio" className="studiowatchlist__selection__reset">reset</a>

              <Container fluid>
                <Row>
                  <Col md={3}>

                    <StudioSearchSort></StudioSearchSort>

                    <StudioMovieInfo></StudioMovieInfo>


                  </Col>

                  <Col md={3}>


                    <StudioSelectionList></StudioSelectionList>


                  </Col>

                  <Col md={3}>

                  </Col>

                  <Col md={3}>
                    
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
  }
}

export default connect(
  mapStateToProps
)(StudioWatchList);

