import React from "react";
import { connect } from 'react-redux';
import { SearchKeywords } from '../../actions';
import { SetLensKeywords } from '../../actions';
import { store } from '../../store';
import "../../scss/filterkeywords.scss";


function FilterKeywords(props) {

  var keywords = props.keywords;

  var lens = props.lens;

  function search(name) {
    store.dispatch(SearchKeywords(name))
  }

  function selectWord(name) {

    if (!lens.keywords.includes(name)) {
      store.dispatch(SetLensKeywords(name))
    }
  }
  
  return (
    <div id="keywords" className="keywords">
      <h1 className="keywords__title">search keyword</h1>
      <input className="keywords__search" onChange={(e)=> search(e.target.value)} type="text" />

      {keywords !== null?
        <ul className="keywords__list">

        { keywords.results.map( (word, index) =>

          <li key={index} onClick={()=> selectWord(word.name)} style={{border:lens.keywords.includes(word.name)? "2px solid #bde0fe": "", color:lens.keywords.includes(word.name)? "#bde0fe": "" }} className="keywords__list__word">{word.name}</li>
  
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
    keywords: state.keywords,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterKeywords);

