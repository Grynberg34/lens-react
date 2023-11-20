import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import { CheckMenu } from '../../actions';
import { GetWatchlist } from '../../actions';
import { GetMovieInfo } from '../../actions';
import Menu from '../Menu';
import WatchlistInfo from './WatchlistInfo';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../icon/font/flaticon_lens.scss";
import "../../scss/watchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Watchlist(props) {

  var { id } = useParams();

  var { user } = useParams();

  var watchlist = props.watchlist;

  var menu = props.menu;

  var items = props.items;

  if (menu !== false) {
    store.dispatch(CheckMenu('red'))
  }

  if (watchlist === null || parseInt(id) !== watchlist?.id) {
    store.dispatch(GetWatchlist(props.jwt, id))
  }
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  function getMovieInfo(id, content) {
    store.dispatch(GetMovieInfo(id, content)) 
  }

  if (props.jwt !== null && auth === false) {
    return (
      null
    )
  } else {
    if (auth === true) {
  
      if (watchlist === null) {
        return (
          <div id='watchlist' className="watchlist" style={{backgroundImage: `url('/images/background-watchlist.png')`}}>
            <Menu></Menu>
          </div>
        )
      } else {

        if (watchlist.userId !== parseInt(user)) {
          return (
            <Navigate to="/" />
          )
        } else {
          return (
            <div id='watchlist' className="watchlist" style={{backgroundImage: `url('/images/background-watchlist.png')`}}>
              <Menu></Menu>
  
              <div className="watchlist__content">
                <Container fluid>
                  <Row>
    
                    <Col md={2}>
                      <div className="watchlist__content__header">
          
                        <h1 className="watchlist__content__header__title">{watchlist.title}</h1>

                        <h1 className="watchlist__content__header__text">{watchlist.description}</h1>
                      </div>
                    </Col>
                    <Col md={6}>
    
                      {
                        items !== null ?
                        <div className="watchlist__content__items">

                          {items.map((item, index) =>
                            <div onClick={()=> getMovieInfo(item.info.id, watchlist.uri_content)} key={index} className="watchlist__content__items__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(151,205,213, 0.9) 0%,rgba(151,205,213,0.9) 100%), url('https://image.tmdb.org/t/p/original/${item.info.backdrop_path}')`}}>
                              <Container fluid>
                                <Row>
                                  <Col md={6}>
                                    <img className="watchlist__content__items__item__img" src={`https://image.tmdb.org/t/p/original/${item.info.backdrop_path}`} alt="" />
                                  </Col>

                                  <Col md={6}>
                                    <h1 className="watchlist__content__items__item__title">{item.info.original_title}</h1>

                                    <h2 className="watchlist__content__items__item__subtitle">
                                      { item.credits?.crew.map( (person, index) =><span key={index}> {person.job === 'Director' ?person.name+' | ':null}</span>)}
                                      {watchlist.content === 'movies'? <span>{item.info.release_date !== undefined ?item.info.release_date.substring(0,4):null}</span>:<span>{item.info.first_air_date!== undefined ?(item.info.first_air_date.substring(0,4)):null}</span>}
                                    </h2>

                                  </Col>
                                </Row>
                              </Container>

                            </div>
                          )}

                        </div>
                        :null
                      }
    
                    </Col>

                    <Col md={4}>
                      <WatchlistInfo></WatchlistInfo>
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
        <Navigate to="/" />
      )
    }
  }
  


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
    watchlist: state.watchlist,
    menu: state.menu,
    items: state.items,
    movie: state.movie,
  }
}

export default connect(
  mapStateToProps
)(Watchlist);

