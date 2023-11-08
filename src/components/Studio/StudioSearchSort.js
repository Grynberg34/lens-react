import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import { SortSelectionList } from '../../actions';
import { SearchSelectionList } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiowatchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function StudioSearchSort(props) {
  
  var selection_list = props.selection_list;
  
  function sortList(filter) {
    store.dispatch(SortSelectionList(filter, selection_list.filter));
  }

  function searchList(filter) {
    store.dispatch(SearchSelectionList(filter, selection_list.all));
  }

  return (
    <div className="">
      <label className="studiowatchlist__selection__label">search title</label>
      <input onChange={(e)=> searchList(e.target.value)} className="studiowatchlist__selection__input" type="text" />

      <label className="studiowatchlist__selection__label">sort by</label>

      <Container fluid>
        <Row>
          <Col md={6}>
            <button onClick={()=> sortList('A-Z')} className="studiowatchlist__selection__sort">title <i className="flaticon-arrow-up studiowatchlist__selection__icon"></i></button>
          </Col>

          <Col md={6}>
            <button onClick={()=> sortList('0-9')} className="studiowatchlist__selection__sort">year <i className="flaticon-arrow-up studiowatchlist__selection__icon"></i></button>
          </Col>

          <Col md={6}>
            <button onClick={()=> sortList('Z-A')} className="studiowatchlist__selection__sort">title <i className="flaticon-arrow-up studiowatchlist__selection__icon--right"></i></button>
          </Col>

          <Col md={6}>
            <button onClick={()=> sortList('9-0')} className="studiowatchlist__selection__sort">year <i className="flaticon-arrow-up studiowatchlist__selection__icon--right"></i></button>
          </Col>
        </Row>
      </Container>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    selection_list: state.selection_list,
    movie: state.movie
  }
}

export default connect(
  mapStateToProps
)(StudioSearchSort);

