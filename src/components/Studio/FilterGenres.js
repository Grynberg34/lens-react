import React from "react";
import { connect } from 'react-redux';
import { SetLensGenres } from '../../actions';
import { store } from '../../store';
import "../../scss/filtergenres.scss";


function FilterGenres(props) {

  var genres = props.genres;
  
  var lens = props.lens;

  function selectGenre(genre) {

    if (!lens.genres.includes(genre)) {
      store.dispatch(SetLensGenres(genre))
    }

  }
  
  return (
    <div id="genres" className="genres">
      
      <ul className="genres__list">

      { genres.map( (genre, index) =>

        <li key={index} onClick={()=> selectGenre(genre)} className="genres__list__genre" style={{border:lens.genres.includes(genre)? "2px solid #bde0fe": "", color:lens.genres.includes(genre)? "#bde0fe": "" }}>{genre}</li>

      )}

      </ul>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    genres: state.genres,
    lens: state.lens
  }
}

export default connect(
  mapStateToProps
)(FilterGenres);

