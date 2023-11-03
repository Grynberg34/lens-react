import React from "react";
import { connect } from 'react-redux';
import { SetLensCountry } from '../../actions';
import { store } from '../../store';
import "../../scss/filterdate.scss";


function FilterDate(props) {

  var date = props.date;

  var lens = props.lens;

  function selectCountry(iso,name) {
    store.dispatch(SetLensCountry(iso,name))
  }
  
  return (
    <div id="date" className="date">
      
      <ul className="date__list">

      { date.map( (country, index) =>

        <li key={index} onClick={()=> selectCountry(country.iso_3166_1, country.english_name)} style={{border:lens.country.iso === country.iso_3166_1? "2px solid #bde0fe": "", color:lens.country.iso === country.iso_3166_1? "#bde0fe": "" }} className="date__list__country">{country.english_name}</li>

      )}

      </ul>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    date: state.date,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterDate);

