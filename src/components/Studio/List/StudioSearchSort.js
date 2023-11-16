import React, { useState } from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { SortSelectionList } from '../../../actions';
import { SearchSelectionList } from '../../../actions';
import StudioMovieInfo from './StudioMovieInfo';
import StudioSeriesInfo from './StudioSeriesInfo';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist-sort.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioSearchSort(props) {

  var list = props.list;
  
  var selection_list = props.selection_list;
  
  const [title, setTitle] = useState(true);

  const [year, setYear] = useState(true);
  
  function sortList(filter) {
    store.dispatch(SortSelectionList(filter, selection_list.filter));
  }

  function searchList(filter) {
    store.dispatch(SearchSelectionList(filter, selection_list.all));
  }

  return (
    <div className="studiolist__selection__filter">
      <label className="studiolist__selection__filter__label">search title</label>
      <input onChange={(e)=> searchList(e.target.value)} className="studiolist__selection__filter__input" type="text" />

      <label className="studiolist__selection__filter__label">sort by</label>

      <Container fluid>
        <Row>
          <Col md={6}>
            {
              title?
              <button onClick={()=> { sortList('A-Z'); setTitle(false)}} className="studiolist__selection__filter__sort">title</button>
              :<button  onClick={()=> { sortList('Z-A'); setTitle(true)}} className="studiolist__selection__filter__sort">title</button>
            }
          </Col>

          <Col md={6}>

            {
              year?
              <button  onClick={()=> { sortList('0-9'); setYear(false)}} className="studiolist__selection__filter__sort">year</button>
              :<button  onClick={()=> { sortList('9-0'); setYear(true)}} className="studiolist__selection__filter__sort">year</button>
            }
          </Col>
        </Row>
      </Container>

      {list.content === 'movies'?
        <StudioMovieInfo></StudioMovieInfo>
        :<StudioSeriesInfo></StudioSeriesInfo>
      }


    </div>


  )

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
)(StudioSearchSort);

