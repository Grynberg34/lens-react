import React from "react";
import { connect } from 'react-redux';
import { ShowLens } from '../../actions';
import FilterCountries from './FilterCountries';
import FilterDate from './FilterDate';
import FilterGenres from './FilterGenres';
import { store } from '../../store';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiofilterselect.scss";


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

      {filter === 'person'?
        <div className="filterselect__filter">
          <h1 className="filterselect__filter__title">person</h1>
        </div>
        :null
      }

      {filter === 'keyword'?
        <div className="filterselect__filter">
          <h1 className="filterselect__filter__title">keyword</h1>
        </div>
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

