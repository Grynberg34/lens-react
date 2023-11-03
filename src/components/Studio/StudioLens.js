import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiolens.scss";


function StudioLens(props) {
 
  var lens = props.lens;
  
  return (
    <div id="lens" className="lens">

    <div className="lens__add">
      <h1 className="lens__add__title">create lens</h1>
      <h2 className="lens__add__number"></h2>
    </div>

    {lens.country.name !== null?
    <div className="lens__filter">
      <h2 className="lens__filter__title">country</h2>
      <h3 className="lens__filter__content">{lens.country.name}</h3>
    </div>
    :null
    }
      
    </div>
  )


}

function mapStateToProps(state) {
  return {
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(StudioLens);

