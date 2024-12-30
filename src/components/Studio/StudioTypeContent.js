import React from "react";
import { connect } from 'react-redux';
import Menu from '../Menu';
import { SetListType } from '../../actions';
import { SetListContent } from '../../actions';
import { store } from '../../store';
import "../../scss/studiotypecontent.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudioTypeContent(props) {
  

  function setType(type) {
    store.dispatch(SetListType(type))
  }

  function setContent(uri,content) {
    store.dispatch(SetListContent(uri,content))
  }

  var list = props.list;

  
  return (

    <div id='studio' className="studio" style={{backgroundImage: `url('/images/background.png')`}}>
      <Menu></Menu>
      <div id="typecontent" className="typecontent">

        <div className="typecontent__add">
          <h3 className="typecontent__add__title">create</h3>
        </div>


        <div className="typecontent__section">
          <button onClick={()=> setType('watch')} className="typecontent__section__button"  style={{backgroundColor:list.type === "watch" ? "#97cdd5": ""}} >watch<span className="typecontent__section__bold">list</span> </button>
          <button onClick={()=> setType('tier')} className="typecontent__section__button" style={{backgroundColor:list.type === "tier" ? "#97cdd5": ""}}>tier <span className="typecontent__section__bold">list</span> </button>
        </div>


      <div className="typecontent__section">
        <button onClick={() => list.content === null ?  setContent('movie', 'movies') : null} className="typecontent__section__button" style={{backgroundColor:list.content === "movies" ? "#97cdd5": ""}}>movies</button>
        <button onClick={() => list.content === null ?  setContent('tv', 'series') : null} className="typecontent__section__button" style={{backgroundColor:list.content === "series" ? "#97cdd5": ""}}>series</button>
      </div>
  

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

