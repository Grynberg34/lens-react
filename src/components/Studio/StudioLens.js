import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import { RemoveFilter } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiolens.scss";


function StudioLens(props) {
 
  var lens = props.lens;

  function removeFilter(filter) {
    store.dispatch(RemoveFilter(filter))
  }
  
  return (
    <div id="lens" className="lens">

      <div className="lens__add">
        <h1 className="lens__add__title">create lens</h1>
        <h2 className="lens__add__number"></h2>
      </div>

      {lens.country.name !== null?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('country')} className="lens__filter__remove flaticon-delete"></i>
        <h2 className="lens__filter__title">country</h2>
        <h3 className="lens__filter__content">{lens.country.name}</h3>
      </div>
      :null
      }

      {(lens.date.decade !== null || lens.date.year !== null)?
        <div className="lens__filter">
          <i onClick={()=> removeFilter('date')} className="lens__filter__remove flaticon-delete"></i>
          <h2 className="lens__filter__title">date</h2>
          <h3 className="lens__filter__content">{lens.date.decade}{lens.date.year}</h3>
        </div>
        :null
      }

      {lens.genres.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('genres')} className="lens__filter__remove flaticon-delete"></i>
        <h2 className="lens__filter__title">genres</h2>

        { lens.genres.map( (genre, index) =>
          <h3 key={index} className="lens__filter__content--genre">{genre}</h3>
        )}

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

