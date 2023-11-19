import React from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { GetMovieInfo } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist-info.scss";
import useGeoLocation from "react-ipgeolocation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function StudioMovieInfo(props) {

  var list = props.list;

  const location = useGeoLocation();
  var country = location.country;
  
  var movie = props.movie;

  var selection_list = props.selection_list;

  if(movie=== null && selection_list !== null) {
    store.dispatch(GetMovieInfo(selection_list.filter[0].id, list.uri_content ))
  }  

  if (movie !== null ) {

    return (
      <div className="studiolist__selection__info" style={{backgroundImage: `linear-gradient(to bottom, rgba(2,48,71, 0.9) 0%,rgba(2,48,71,0.9) 100%), url('https://image.tmdb.org/t/p/original/${movie.info.poster_path}')`}}>
        
        <h1 className="studiolist__selection__info__title">{movie.info.original_title}</h1>
        {
          movie.info.original_title !== movie.info.title?
          <h2 className="studiolist__selection__info__subtitle">{movie.info.title}</h2>
          :null
        }

        <h3 className="studiolist__selection__info__item overview">{movie.info.overview}</h3>

        { movie.providers?.results[country]?.flatrate !== undefined?
          <div>
            <h2 className="studiolist__selection__info__category">Streaming ({country})</h2>

            <div className="studiolist__selection__info__gallery">
              <Container fluid>
                <Row className="justify-content-center">
                  { movie.providers.results[country].flatrate.map( (provider, index) =>
                    <Col key={index} md={4}>
                      <img key={index} className="studiolist__selection__info__gallery__img" src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} alt="" />
                    </Col>
                  )}
                </Row>
              </Container>
            </div>

          </div>
          :null

        }


        {movie.credits !== undefined?
          <div>
            <h2 className="studiolist__selection__info__category">Directed by</h2>
            { movie.credits.crew.map( (person, index) =>
              <h3 key={index} className="studiolist__selection__info__item"> {person.job === 'Director' ?person.name:null}</h3>
            )}
          </div>
          :null

        }

        <h2 className="studiolist__selection__info__category">Release Date</h2>
        <h3 className="studiolist__selection__info__item">{movie.info.release_date.substring(0,4)}</h3>  
  
        <h2 className="studiolist__selection__info__category">Runtime</h2>
        <h3 className="studiolist__selection__info__item">{movie.info.runtime}'</h3>


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

        {(movie.info.production_companies !== undefined && movie.info.production_companies.length > 0)?
          <div>
            <h2 className="studiolist__selection__info__category">Production Companies</h2>
            { movie.info.production_companies.map( (company, index) =>
              <h3 key={index} className="studiolist__selection__info__item">{company.name}</h3>
            )}
          </div>
          :null
        }

        {(movie.info.production_countries !== undefined && movie.info.production_countries.length > 0)?
          <div>
            <h2 className="studiolist__selection__info__category">Production Countries</h2>
            { movie.info.production_countries.map( (country, index) =>
              <h3 key={index} className="studiolist__selection__info__item">{country.name}</h3>
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

