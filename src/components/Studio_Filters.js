import React from "react";
import { connect } from 'react-redux';
import { ShowFilters } from '../actions';
import { store } from '../store';
import "../icon/font/flaticon_lens.scss";
import "../scss/studiofilters.scss";


function Studio_Filters(props) {

  var filters = props.filter;

  function addFilter(filter) {
    store.dispatch(ShowFilters(filter));
  }
  
  return (
    <div id="filters" className="filters">
      <div className="filters__add">
        <h3 className="filters__add__title">add filter</h3>
      </div>

      <div className="filters__section">
        <button className="filters__section__button">country</button>
        <button className="filters__section__button">genres</button>
        <button className="filters__section__button">keywords</button>
        <button className="filters__section__button">person</button>
        <button className="filters__section__button">time</button>
      </div>



    </div>
  )


}

function mapStateToProps(state) {
  return {
    filters: state.filters
  }
}

export default connect(
  mapStateToProps
)(Studio_Filters);

