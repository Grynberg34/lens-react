import React from "react";
import { connect } from 'react-redux';
import { SearchCastandCrew } from '../../../actions';
import { SetLensCastandCrew } from '../../../actions';
import { store } from '../../../store';
import "../../../scss/filtercastandcrew.scss";


function FilterCastandCrew(props) {

  var castandcrew = props.castandcrew;

  var lens = props.lens;
  
  function search(name) {
    store.dispatch(SearchCastandCrew(name))
  }

  function selectPerson(person) {

    if (!lens.castandcrew.includes(person)) {
      store.dispatch(SetLensCastandCrew(person))
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
          <li key={index} onClick={()=> selectPerson(person)} style={{backgroundImage: `linear-gradient(to bottom, rgba(2,48,71, 0.7) 0%,rgba(2,48,71,0.7) 100%), url(https://image.tmdb.org/t/p/original/${person.profile_path})`,border:lens.castandcrew.find(item => item.name === person.name)? "2px solid #97cdd5": "", color:lens.castandcrew.find(item => item.name === person.name)? "#97cdd5": "" }} className="castandcrew__list__person">{person.name}</li>
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

