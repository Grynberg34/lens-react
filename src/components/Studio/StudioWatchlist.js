import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import Menu from '../Menu';
import StudioSearchSort from './StudioSearchSort';
import StudioMovieInfo from './StudioMovieInfo';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import { CreateSelectionList } from '../../actions';
import { GetMovieInfo } from '../../actions';
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
  
  var movie = props.movie;

  function getMovie(id) {
    store.dispatch(GetMovieInfo(id))
  }

  if (auth === true) {

    if (next === false) {
      return (
        <Navigate to="/studio" />
      )
    } else {

      if (selection_list === null) {
        store.dispatch(CreateSelectionList(list.lenses))


        if(movie === null && selection_list !== null) {
          store.dispatch(GetMovieInfo(selection_list.filter[0].id))
        }      

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

              <Container fluid>
                <Row>
                  <Col md={3}>

                    <StudioSearchSort></StudioSearchSort>

                    <StudioMovieInfo></StudioMovieInfo>


                  </Col>

                  <Col md={3}>

                    <div className="studiowatchlist__selection__list">


                      { selection_list.filter.map( (item, index) =>

                        <div key={index} className="studiowatchlist__selection__list__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(189,224,254, 0.9) 0%,rgba(189,224,254,0.9) 100%), url('https://image.tmdb.org/t/p/original/${item.poster_path}')`}}>

                          <Container fluid>
                            <Row>

                              <Col md={6}>
                                <img className="studiowatchlist__selection__list__item__img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
                              </Col>

                              <Col md={6}>
                                <h2 className="studiowatchlist__selection__list__item__title"> {item.title.length > 30 ? <span>{item.title.substring(0,30) + '...'}</span>: <span>{item.title}</span>} ({item.release_date !== undefined ?(item.release_date.substring(0,4)):null})</h2>

                                <i className="studiowatchlist__selection__list__item__icon flaticon-add-sign"></i>
                                <i onClick={()=> getMovie(item.id)} className="studiowatchlist__selection__list__item__icon flaticon-info"></i>

                              </Col>
                            </Row>
                            </Container>
                        </div>

                      )}

                    </div>


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
      <Navigate to="/home" />
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
    movie: state.movie
  }
}

export default connect(
  mapStateToProps
)(StudioWatchList);

