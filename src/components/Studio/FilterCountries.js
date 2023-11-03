import React from "react";
import { connect } from 'react-redux';
import { SetLensCountry } from '../../actions';
import { store } from '../../store';
import "../../scss/filtercountries.scss";


function FilterCountries(props) {

  var countries = props.countries;

  var lens = props.lens;

  console.log(lens.country)

  function selectCountry(iso,name) {
    store.dispatch(SetLensCountry(iso,name))
  }
  
  return (
    <div id="countries" className="countries">
      
      <ul className="countries__list">

      { countries.map( (country, index) =>

        <li key={index} onClick={()=> selectCountry(country.iso_3166_1, country.english_name)} style={{border:lens.country.iso === country.iso_3166_1? "2px solid #bde0fe": "", color:lens.country.iso === country.iso_3166_1? "#bde0fe": "" }} className="countries__list__country">{country.english_name}</li>

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

