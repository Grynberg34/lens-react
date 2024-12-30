import React from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { RemoveLens } from '../../../actions';
import { AdvanceListCreation } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studionext.scss";


function StudioNext(props) {

  var list = props.list;

  function removeLens(index) {
    store.dispatch(RemoveLens(index))
  }

  function advance() {
    store.dispatch(AdvanceListCreation())
  }
  
  return (
    <div id="next" className="next">

      <div className="next__add">
        <h3 className="next__add__title">pool</h3>
      </div>

      { list.lenses.map( (lens, index) =>
        <div key={index} className="next__lens">
          <i onClick={()=> removeLens({index})} className="next__lens__remove flaticon-remove"></i>
          <h1 className="next__lens__title">#{index+1}</h1>
          
          { lens.filter_description.map( (filter, index) =>
            <h2 key={index} className="next__lens__description">{filter}</h2>
          )}

          <h2 className="next__lens__length">{lens.length} {list.content}</h2>
        </div>
      )}

      {list.lenses.length > 0?
        <button onClick={()=> advance()} className="next__button">next</button>
        :null
      }
      
    </div>
  )


}

function mapStateToProps(state) {
  return {
    list: state.list
  }
}

export default connect(
  mapStateToProps
)(StudioNext);

