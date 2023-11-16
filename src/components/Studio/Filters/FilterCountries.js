import React from "react";
import { connect } from 'react-redux';
import { SetLensCountry } from '../../../actions';
import { SearchCountries } from '../../../actions';
import { store } from '../../../store';
import "../../../scss/filtercountries.scss";


function FilterCountries(props) {

  var countries = props.countries;

  var lens = props.lens;

  function selectCountry(iso,name) {
    store.dispatch(SetLensCountry(iso,name))
  }

  function searchCountry(filter) {
    store.dispatch(SearchCountries(filter, countries.all))
  }
  
  return (
    <div id="countries" className="countries">

      <label className="countries__label">search country</label>
      <input onChange={(e)=> searchCountry(e.target.value)} className="countries__input" type="text" />
      
      <ul className="countries__list">

      { countries.filter.map( (country, index) =>

        <li key={index} onClick={()=> selectCountry(country.iso_3166_1, country.english_name)} style={{border:lens.country.iso === country.iso_3166_1? "2px solid #97cdd5": "", color:lens.country.iso === country.iso_3166_1? "#97cdd5": "" }} className="countries__list__country">{country.english_name}</li>

      )}

      </ul>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    countries: state.countries,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterCountries);

