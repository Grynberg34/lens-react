import React from "react";
import { connect } from 'react-redux';
import { ShowFilter } from '../../../actions';
import { store } from '../../../store';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiofilters.scss";


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
        <button onClick={()=> addFilter('country')} className="filters__section__button" style={{backgroundColor:filter === "country" ? "#97cdd5": ""}} >country</button>
        <button onClick={()=> addFilter('date')} className="filters__section__button" style={{backgroundColor:filter === "date" ? "#97cdd5": ""}} >date</button>
        <button onClick={()=> addFilter('genres')} className="filters__section__button" style={{backgroundColor:filter === "genres" ? "#97cdd5": ""}} >genres</button>
        <button onClick={()=> addFilter('cast and crew')} className="filters__section__button" style={{backgroundColor:filter === "cast and crew" ? "#97cdd5": ""}} >cast and crew</button>
        <button onClick={()=> addFilter('keywords')} className="filters__section__button" style={{backgroundColor:filter === "keywords" ? "#97cdd5": ""}} >keywords</button>
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

