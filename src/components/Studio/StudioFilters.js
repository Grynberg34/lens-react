import React from "react";
import { connect } from 'react-redux';
import { ShowFilter } from '../../actions';
import { store } from '../../store';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiofilters.scss";


function StudioFilters(props) {

  var filter = props.filter;

  function addFilter(filter) {
    store.dispatch(ShowFilter(filter));
  }
  
  return (
    <div id="filters" className="filters">
      <div className="filters__add">
        <h3 className="filters__add__title">add filter</h3>
      </div>

      <div className="filters__section">
        <button onClick={()=> addFilter('country')} className="filters__section__button" style={{backgroundColor:filter === "country" ? "#bde0fe": ""}} >country</button>
        <button onClick={()=> addFilter('date')} className="filters__section__button" style={{backgroundColor:filter === "date" ? "#bde0fe": ""}} >date</button>
        <button onClick={()=> addFilter('genres')} className="filters__section__button" style={{backgroundColor:filter === "genres" ? "#bde0fe": ""}} >genres</button>
        <button onClick={()=> addFilter('cast and crew')} className="filters__section__button" style={{backgroundColor:filter === "cast and crew" ? "#bde0fe": ""}} >cast and crew</button>
        <button onClick={()=> addFilter('keywords')} className="filters__section__button" style={{backgroundColor:filter === "keywords" ? "#bde0fe": ""}} >keywords</button>
      </div>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter
  }
}

export default connect(
  mapStateToProps
)(StudioFilters);

