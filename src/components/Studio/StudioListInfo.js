import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiowatchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioListInfo(props) {

  var list = props.list;

  function setListTitle(title) {

  }

  function setListDescription(text) {

  }

  return (
    <div className="studiowatchlist__selection__main">

      <label className="studiowatchlist__selection__main__label">list title</label>
      <input onChange={(e)=> setListTitle(e.target.value)} className="studiowatchlist__selection__main__input" type="text" />

      <label className="studiowatchlist__selection__main__label">description (optional)</label>
      <textarea rows='5' onChange={(e)=> setListDescription(e.target.value)} className="studiowatchlist__selection__main__input" type="text" ></textarea>

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
)(StudioListInfo);

