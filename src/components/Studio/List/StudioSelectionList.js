import React from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { GetMovieInfo } from '../../../actions';
import { SetListItem } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist-selection.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioSelectionList(props) {

  var selection_list = props.selection_list;

  var movie = props.movie;

  var list = props.list;

  function getMovie(id) {
    store.dispatch(GetMovieInfo(id, list.uri_content))
  }

  function addMovie(item) {

    if (!list.content_items.includes(item)) {
      store.dispatch(SetListItem(item))
    }
  }

  if(movie === null && selection_list !== null) {
    store.dispatch(GetMovieInfo(selection_list.filter[0].id, list.uri_content))

    return null

  }  else {

    return (

      <div className="studiolist__selection__list">

        <h1 className="studiolist__selection__list__length">{selection_list.filter.length} {list.content}</h1>
  
        { selection_list.filter.map( (item, index) =>
  
          <div key={index} className="studiolist__selection__list__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(151,205,213, 0.85) 0%,rgba(151,205,213,0.85) 100%), url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`}}>
            <Container fluid>
              <Row>
                <Col md={6}>
                  <img className="studiolist__selection__list__item__img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
                </Col>
  
                <Col md={6}>
                  {list.content === 'movies'?
                    <h2 className="studiolist__selection__list__item__title"> {item.title.length > 30 ? <span>{item.title.substring(0,30) + '...'}</span>: <span>{item.title}</span>} ({item.release_date !== undefined ?(item.release_date.substring(0,4)):null})</h2>
                    :<h2 className="studiolist__selection__list__item__title"> {item.name.length > 30 ? <span>{item.name.substring(0,30) + '...'}</span>: <span>{item.name}</span>} ({item.first_air_date!== undefined ?(item.first_air_date.substring(0,4)):null})</h2>
                  }
  
                  <i style={{color:list.content_items.includes(item)? "#ff9e00": "#023047" }} onClick={()=> addMovie(item)} className="studiolist__selection__list__item__icon flaticon-add-sign"></i>
                  <i style={{color:movie.info.id === item.id? "#ff9e00": "#023047" }} onClick={()=> getMovie(item.id)} className="studiolist__selection__list__item__icon flaticon-info"></i>
  
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
    movie: state.movie,
    list: state.list
  }
}

export default connect(
  mapStateToProps
)(StudioSelectionList);

