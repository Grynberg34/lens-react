import React, { useState } from "react";
import { connect } from 'react-redux';
import { SetLensDate } from '../../../actions';
import { RemoveFilter } from '../../../actions';
import { store } from '../../../store';
import "../../../scss/filterdate.scss";


function FilterDate(props) {

  var date = props.date;

  var lens = props.lens;

  function selectTime(year) {

    store.dispatch(SetLensDate(year))

  }

  const [decade, setDecade] = useState(true);

  function removeFilter(filter) {
    store.dispatch(RemoveFilter(filter))
  }
  
  return (
    <div id="date" className="date">
      
      <div className="date__list">

        <h1 className="date__list__select"> <span style={{color:decade === true? "#97cdd5": ""}} onClick={()=> setDecade(true)} className="date__list__select__option">decades</span>  |  <span style={{color:decade === false? "#97cdd5": ""}} onClick={()=> setDecade(false)} className="date__list__select__option">years</span> </h1>

      { date.map( (date, index) =>

        <div key={index} className="date__list__decades">

        {
          decade?
            <div>
              <h1 style={{border:lens.date === date.decade? "2px solid #97cdd5": "", color:lens.date === date.decade? "#97cdd5": "" }} className="date__list__decades__decade" onClick={()=> lens.date !== date.decade?selectTime(date.decade):removeFilter('date')}>{date.decade}</h1>
            </div>
           : <div>
              { date.years.map( (year, index) =>
                <h2 style={{border:lens.date === year? "2px solid #97cdd5": "", color:lens.date === year? "#97cdd5": "" }} key={index} className="date__list__decades__year" onClick={()=> lens.date !== year? selectTime(year):removeFilter('date')}>{year}</h2>
              )}
            </div>
           
        }
          

        </div>

      )}

      </div>

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

