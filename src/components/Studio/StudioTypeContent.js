import React from "react";
import { connect } from 'react-redux';
import { SetListType } from '../../actions';
import { SetListContent } from '../../actions';
import { store } from '../../store';
import "../../scss/studiotypecontent.scss";

function StudioTypeContent(props) {
  

  function setType(type) {
    store.dispatch(SetListType(type))
  }

  function setContent(uri,content) {
    store.dispatch(SetListContent(uri,content))
  }

  var list = props.list;

  
  return (
    
    <div id="typecontent" className="typecontent">

      <div className="typecontent__add">
        <h3 className="typecontent__add__title">type and content</h3>
      </div>

      <div className="typecontent__section">
        <button onClick={()=> setType('watch')} className="typecontent__section__button"  style={{backgroundColor:list.type === "watch" ? "#bde0fe": ""}} >watch <span className="typecontent__section__bold">list</span> </button>
        <button onClick={()=> setType('tier')} className="typecontent__section__button" style={{backgroundColor:list.type === "tier" ? "#bde0fe": ""}}>tier <span className="typecontent__section__bold">list</span> </button>
      </div>

      <div className="typecontent__section">
        <button onClick={()=> setContent('movie', 'movies')} className="typecontent__section__button" style={{backgroundColor:list.content === "movies" ? "#bde0fe": ""}}>movies</button>
        <button onClick={()=> setContent('tv', 'series')} className="typecontent__section__button" style={{backgroundColor:list.content === "series" ? "#bde0fe": ""}}>series</button>
      </div>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    list: state.list,
  }
}

export default connect(
  mapStateToProps
)(StudioTypeContent);

