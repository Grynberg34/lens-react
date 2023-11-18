import React from "react";
import { connect } from 'react-redux';
import { ShowLens } from '../../../actions';
import FilterCountries from './FilterCountries';
import FilterDate from './FilterDate';
import FilterGenres from './FilterGenres';
import FilterCastandCrew from './FilterCastandCrew';
import FilterCompanies from './FilterCompanies';
import { store } from '../../../store';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiofilterselect.scss";


function StudioFilterSelect(props) {

  var filter = props.filter;

  return (
    <div id="filterselect" className="filterselect">

      {filter === 'country'?
        <FilterCountries></FilterCountries>
        :null
      }

      {filter === 'date'?
        <FilterDate></FilterDate>
        :null
      }

      {filter === 'genres'?
        <FilterGenres></FilterGenres>
        :null
      }

      {filter === 'cast and crew'?
        <FilterCastandCrew></FilterCastandCrew>
        :null
      }

      {filter === 'companies'?
        <FilterCompanies></FilterCompanies>
        :null
      }

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
  }
}

export default connect(
  mapStateToProps
)(StudioFilterSelect);

