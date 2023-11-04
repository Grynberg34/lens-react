import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studionext.scss";


function StudioNext(props) {

 
  

  
  return (
    <div id="next" className="next">

    <div className="next__add">
        <h3 className="next__add__title"></h3>
      </div>
      
    </div>
  )


}

function mapStateToProps(state) {
  return {
    next: state.next
  }
}

export default connect(
  mapStateToProps
)(StudioNext);

