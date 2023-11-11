import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import { GetMovieInfo } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiowatchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioSelectionList(props) {

  var selection_list = props.selection_list;

  var movie = props.movie;

  function getMovie(id) {
    store.dispatch(GetMovieInfo(id))
  }

  if(movie === null && selection_list !== null) {
    store.dispatch(GetMovieInfo(selection_list.filter[0].id))

    return null

  }  else {

    return (

      <div className="studiowatchlist__selection__list">
    
          { selection_list.filter.map( (item, index) =>
    
            <div key={index} className="studiowatchlist__selection__list__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(151,205,213, 0.9) 0%,rgba(151,205,213,0.9) 100%), url('https://image.tmdb.org/t/p/original/${item.poster_path}')`}}>
    
              <Container fluid>
                <Row>
    
                  <Col md={6}>
                    <img className="studiowatchlist__selection__list__item__img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
                  </Col>
    
                  <Col md={6}>
                    <h2 className="studiowatchlist__selection__list__item__title"> {item.title.length > 30 ? <span>{item.title.substring(0,30) + '...'}</span>: <span>{item.title}</span>} ({item.release_date !== undefined ?(item.release_date.substring(0,4)):null})</h2>
    
                    <i className="studiowatchlist__selection__list__item__icon flaticon-add-sign"></i>
                    <i style={{color:movie.info.id === item.id? "#ff9e00": "#023047" }} onClick={()=> getMovie(item.id)} className="studiowatchlist__selection__list__item__icon flaticon-info"></i>
    
                  </Col>
                </Row>
                </Container>
            </div>
    
          )}
    
      </div>

    )

  }
  


}

function mapStateToProps(state) {
  return {
    selection_list: state.selection_list,
    movie: state.movie
  }
}

export default connect(
  mapStateToProps
)(StudioSelectionList);

