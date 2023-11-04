import React from "react";
import { connect } from 'react-redux';
import { SearchCastandCrew } from '../../actions';
import { SetLensCastandCrew } from '../../actions';
import { store } from '../../store';
import "../../scss/filtercastandcrew.scss";


function FilterCastandCrew(props) {

  var castandcrew = props.castandcrew;

  var lens = props.lens;

  function search(name) {
    store.dispatch(SearchCastandCrew(name))
  }

  function selectPerson(name) {

    if (!lens.castandcrew.includes(name)) {
      store.dispatch(SetLensCastandCrew(name))
    }
  }
  
  return (
    <div id="castandcrew" className="castandcrew">
      <h1 className="castandcrew__title">search person</h1>
      <input className="castandcrew__search" onChange={(e)=> search(e.target.value)} type="text" />

      {castandcrew !== null?
        <ul className="castandcrew__list">

        { castandcrew.results.map( (person, index) =>
  
          person.profile_path !== null?
          <li key={index} onClick={()=> selectPerson(person.name)} style={{border:lens.castandcrew.includes(person.name)? "2px solid #bde0fe": "", color:lens.castandcrew.includes(person.name)? "#bde0fe": "" }} className="castandcrew__list__person">{person.name}
          <img className="castandcrew__list__person__img" src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt="" />
          </li>
          :null
           
  
        )}
  
        </ul>
        :null  
      }

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    castandcrew: state.castandcrew,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterCastandCrew);

