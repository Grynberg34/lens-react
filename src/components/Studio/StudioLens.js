import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import { RemoveFilter } from '../../actions';
import { CreateLens } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiolens.scss";


function StudioLens(props) {
 
  var lens = props.lens;

  function removeFilter(filter) {
    store.dispatch(RemoveFilter(filter))
  }

  function createLens(lens) {
    store.dispatch(CreateLens(lens))
  }
  
  return (
    <div id="lens" className="lens">

      <div className="lens__add">
        <h1 className="lens__add__title">create lens</h1>
        <h2 className="lens__add__number"></h2>
      </div>

      {lens.country.name !== null?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('country')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">country</h2>
        <h3 className="lens__filter__content">{lens.country.name}</h3>
      </div>
      :null
      }

      {(lens.date.decade !== null || lens.date.year !== null)?
        <div className="lens__filter">
          <i onClick={()=> removeFilter('date')} className="lens__filter__remove flaticon-remove"></i>
          <h2 className="lens__filter__title">date</h2>
          <h3 className="lens__filter__content">{lens.date.decade}{lens.date.year}</h3>
        </div>
        :null
      }

      {lens.genres.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('genres')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">genres</h2>

        { lens.genres.map( (genre, index) =>
          <h3 key={index} className="lens__filter__content--genre">{genre}</h3>
        )}

      </div>
      :null
      }

      {lens.castandcrew.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('cast and crew')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">cast and crew</h2>

        { lens.castandcrew.map( (person, index) =>
          <h3 key={index} className="lens__filter__content--genre">{person}</h3>
        )}

      </div>
      :null
      }

    {lens.keywords.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('keywords')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">keywords</h2>

        { lens.keywords.map( (word, index) =>
          <h3 key={index} className="lens__filter__content--genre">{word}</h3>
        )}

      </div>
      :null
      }

      {(lens.country.name !== null || lens.date.decade !== null || lens.date.year !== null || lens.genres.length > 0 || lens.castandcrew.length > 0 || lens.keywords.length > 0)?
        <button onClick={()=> createLens(lens)} className="lens__button">create</button>
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

