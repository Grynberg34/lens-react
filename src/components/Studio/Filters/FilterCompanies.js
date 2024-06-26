import React from "react";
import { connect } from 'react-redux';
import { SearchCompanies } from '../../../actions';
import { SetLensCompanies } from '../../../actions';
import { store } from '../../../store';
import "../../../scss/filtercompanies.scss";


function FilterCompanies(props) {

  var companies = props.companies;

  var lens = props.lens;

  function search(name) {
    store.dispatch(SearchCompanies(name))
  }

  function selectWord(name) {

    if (!lens.companies.includes(name)) {
      store.dispatch(SetLensCompanies(name))
    }
  }
  
  return (
    <div id="companies" className="companies">
      <h1 className="companies__title">search company</h1>
      <input className="companies__search" onChange={(e)=> search(e.target.value)} type="text" />

      {companies !== null?
        <ul className="companies__list">

        { companies.results.map( (company, index) =>

          <li key={index} onClick={()=> selectWord(company)} style={{border:lens.companies.find(item => item.name === company.name)? "2px solid #97cdd5": "", color:lens.companies.find(item => item.name === company.name)? "#97cdd5": "" }} className="companies__list__company">{company.name}</li>
  
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
    companies: state.companies,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterCompanies);

