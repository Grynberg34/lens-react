import React from "react";
import { connect } from 'react-redux';
import { SetLensGenres } from '../../actions';
import { store } from '../../store';
import "../../scss/filtergenres.scss";


function FilterGenres(props) {

  var list = props.list;

  if (list.uri_content === 'movie') {
    var genres = props.genres.movie
  } else if (list.uri_content === 'tv') {
    var genres = props.genres.tv
  }
  
  var lens = props.lens;

  function selectGenre(genre) {

    if (!lens.genres.includes(genre.name)) {
      store.dispatch(SetLensGenres(genre))
    }

  }
  
  return (
    <div id="genres" className="genres">
      
      <ul className="genres__list">

      { genres.map( (genre, index) =>

        <li key={index} onClick={()=> selectGenre(genre)} className="genres__list__genre" style={{border:lens.genres.includes(genre.name)? "2px solid #bde0fe": "", color:lens.genres.includes(genre)? "#bde0fe": "" }}>{genre.name}</li>

      )}

      </ul>

    </div>
  )


}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    genres: state.genres,
    lens: state.lens,
    list: state.list
  }
}

export default connect(
  mapStateToProps
)(FilterGenres);

