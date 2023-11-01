import React from "react";
import { connect } from 'react-redux';
import { ShowLens } from '../actions';
import { store } from '../store';
import "../icon/font/flaticon_lens.scss";
import "../scss/studiolens.scss";


function Studio_Lens(props) {

  
  return (
    <div id="lens" className="lens">


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
)(Studio_Lens);

