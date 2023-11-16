import React from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { RemoveFilter } from '../../../actions';
import { CreateLens } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolens.scss";


function StudioLens(props) {
 
  var lens = props.lens;

  var list = props.list;

  var lens_fail = props.lens_fail;

  function removeFilter(filter) {
    store.dispatch(RemoveFilter(filter))
  }

  function createLens(lens, list) {
    store.dispatch(CreateLens(lens, list))
  }
  
  return (
    <div id="lens" className="lens">

      <div className="lens__add">
        <h1 className="lens__add__title">create lens</h1>
        <h2 className="lens__add__number"></h2>
      </div>

      {lens.fail !== null?
        <h3 className="lens__fail">{lens_fail}</h3>
        :null
      }

      {lens.country.name !== null?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('country')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">country</h2>
        <h3 className="lens__filter__content">{lens.country.name}</h3>
      </div>
      :null
      }

      {lens.date !== null?
        <div className="lens__filter">
          <i onClick={()=> removeFilter('date')} className="lens__filter__remove flaticon-remove"></i>
          <h2 className="lens__filter__title">date</h2>
          <h3 className="lens__filter__content">{lens.date}</h3>
        </div>
        :null
      }

      {lens.genres.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('genres')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">genres</h2>

        { lens.genres.map( (genre, index) =>
          <h3 key={index} className="lens__filter__content--genre">{genre.name}</h3>
        )}

      </div>
      :null
      }

      {lens.castandcrew.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('cast and crew')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">cast and crew</h2>

        { lens.castandcrew.map( (person, index) =>
          <h3 key={index} className="lens__filter__content--genre">{person.name}</h3>
        )}

      </div>
      :null
      }

    {lens.keywords.length > 0?
      <div className="lens__filter">
        <i onClick={()=> removeFilter('keywords')} className="lens__filter__remove flaticon-remove"></i>
        <h2 className="lens__filter__title">keywords</h2>

        { lens.keywords.map( (word, index) =>
          <h3 key={index} className="lens__filter__content--genre">{word.name}</h3>
        )}

      </div>
      :null
      }

      {(lens.country.name !== null || lens.date !== null || lens.genres.length > 0 || lens.castandcrew.length > 0 || lens.keywords.length > 0)?
        <button onClick={()=> createLens(lens, list)} className="lens__button">create</button>
        :null
      }
      
    </div>
  )


}

function mapStateToProps(state) {
  return {
    lens: state.lens,
    list: state.list,
    lens_fail: state.lens_fail
  }
}

export default connect(
  mapStateToProps
)(StudioLens);

