import React from "react";
import { connect } from 'react-redux';
import { SetLensDate } from '../../actions';
import { store } from '../../store';
import "../../scss/filterdate.scss";


function FilterDate(props) {

  var date = props.date;

  console.log(date)

  var lens = props.lens;

  function selectTime(year_start, year_end) {
    store.dispatch(SetLensDate(year_start, year_end))
  }
  
  return (
    <div id="date" className="date">
      
      <div className="date__list">

      { date.map( (date, index) =>

        <div key={index} className="date__list__decades">

          {date.years[0] === 2020?
          <h1 style={{border:lens.date.decade === date.decade? "2px solid #bde0fe": "", color:lens.date.decade === date.decade? "#bde0fe": "" }} className="date__list__decades__decade" onClick={()=> selectTime(date.years[0], date.years[3])}>{date.decade}</h1>
          :<h1 style={{border:lens.date.decade === date.decade? "2px solid #bde0fe": "", color:lens.date.decade === date.decade? "#bde0fe": "" }} className="date__list__decades__decade" onClick={()=> selectTime(date.years[0], date.years[9])}>{date.decade}</h1>
          }
          
          { date.years.map( (year, index) =>
            <h2 style={{border:lens.date.year === year? "2px solid #bde0fe": "", color:lens.date.year === year? "#bde0fe": "" }} key={index} className="date__list__decades__year" onClick={()=> selectTime(year, null)}>{year}</h2>
          )}

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

