import React from "react";
import { connect } from 'react-redux';
import { store } from '../../store';
import { GetMovieInfo } from '../../actions';
import "../../icon/font/flaticon_lens.scss";
import "../../scss/studiolist-info.scss";
import useGeoLocation from "react-ipgeolocation";


function StudioMovieInfo(props) {

  var list = props.list;

  const location = useGeoLocation();
  var country = location.country;
  
  var movie = props.movie;
  var selection_list = props.selection_list;

  if(movie=== null && selection_list !== null) {
    store.dispatch(GetMovieInfo(selection_list.filter[0].id, list.uri_content ))
  }  

  console.log(movie)

  if (movie !== null ) {

    return (
      <div className="studiolist__selection__info" style={{backgroundImage: `linear-gradient(to bottom, rgba(2,48,71, 0.9) 0%,rgba(2,48,71,0.9) 100%), url('https://image.tmdb.org/t/p/original/${movie.info.poster_path}')`}}>
        
        <h1 className="studiolist__selection__info__title">{movie.info.original_name}</h1>

        <h3 className="studiolist__selection__info__item overview">{movie.info.overview}</h3>

        { movie.providers?.results[country]?.flatrate !== undefined?
          <div>
            <h2 className="studiolist__selection__info__category">Where to watch ({country})</h2>

            <div className="studiolist__selection__info__gallery">
              { movie.providers.results[country].flatrate.map( (provider, index) =>
                <img key={index} className="studiolist__selection__info__gallery__img" src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} alt="" />
              )}
            </div>

          </div>
          :null

        }

        {movie.info.created_by.length >0?
          <div>
            <h2 className="studiolist__selection__info__category">Created by</h2>
            { movie.info.created_by.map( (person, index) =>
              <h3 key={index} className="studiolist__selection__info__item"> {person.name}</h3>
            )}
          </div>
          :null      
      }

        <h2 className="studiolist__selection__info__category">Air Date</h2>

        <h3 className="studiolist__selection__info__item">{movie.info.first_air_date.substring(0,4)} - {movie.info.last_air_date.substring(0,4)}</h3>
        
        <h2 className="studiolist__selection__info__category">Number of seasons</h2>
        <h3 className="studiolist__selection__info__item">{movie.info.number_of_seasons}</h3>


        <h2 className="studiolist__selection__info__category">Number of episodes</h2>
        <h3 className="studiolist__selection__info__item">{movie.info.number_of_episodes}</h3>

        {movie.info.genres.length > 0?
          <div>
            <h2 className="studiolist__selection__info__category">Genres</h2>
            { movie.info.genres.map( (genre, index) =>
            <h3 key={index} className="studiolist__selection__info__item"> {genre.name}</h3>
            )}
          </div>
          :null          
        }

        {movie.credits?.cast !== undefined?
          <div>
            <h2 className="studiolist__selection__info__category">Cast</h2>
            { movie.credits.cast.map( (person, index) =>
              <h3 key={index} className="studiolist__selection__info__item"> {(index < 5) ?person.name:null}</h3>
            )}
          </div>
          :null

        }

        {movie.keywords !== undefined?
          <div>
            <h2 className="studiolist__selection__info__category">Keywords</h2>
            { movie.keywords.results.map( (keyword, index) =>
              <h3 key={index} className="studiolist__selection__info__item">{keyword.name}</h3>
            )}
          </div>
          :null

        }

      </div>
    )
  }
  else {
    return null
  }



}

function mapStateToProps(state) {
  return {
    movie: state.movie,
    selection_list: state.selection_list,
    list: state.list
  }
}

export default connect(
  mapStateToProps
)(StudioMovieInfo);

