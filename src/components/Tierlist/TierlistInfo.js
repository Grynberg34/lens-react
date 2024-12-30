import React from "react";
import { connect } from 'react-redux';
import { GetMovieInfo } from '../../actions';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import "../../icon/font/flaticon_lens.scss";
import "../../scss/tierlist-info.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGeoLocation from "react-ipgeolocation";

function WatchlistInfo(props) {

  var movie = props.movie;

  var items = props.items;

  var tierlist = props.tierlist;

  if(movie=== null && tierlist !== null && items !== null) {
    store.dispatch(GetMovieInfo(items[0]?.info.id, tierlist.uri_content ))
  } 
  
  const location = useGeoLocation();
  var country = location.country;

  return (
    <div className="tierlist__content__info">
      {
        movie !== null?
        <div className="tierlist__content__info__movie" style={{backgroundImage: `linear-gradient(to bottom, rgba(151,205,213, 0.95) 0%,rgba(151,205,213,0.95) 100%), url('https://image.tmdb.org/t/p/original/${movie.info.poster_path}')`}}>
              
        <h1 className="tierlist__content__info__movie__title">{movie.info.original_title}</h1>
        {
          movie.info.original_title !== movie.info.title?
          <h2 className="tierlist__content__info__movie__subtitle">{movie.info.title}</h2>
          :null
        }

        <img className="tierlist__content__info__movie__img" src={`https://image.tmdb.org/t/p/original/${movie.info.poster_path}`} alt="" />

        <h3 className="tierlist__content__info__movie__item overview">{movie.info.overview}</h3>

        { movie.providers?.results[country]?.flatrate !== undefined?
          <div>
            <h2 className="tierlist__content__info__movie__category">Streaming ({country})</h2>

            <div className="tierlist__content__info__movie__gallery">
              <Container fluid>
                <Row className="justify-content-center">
                  { movie.providers.results[country].flatrate.map( (provider, index) =>
                    <Col key={index} md={4}>
                      <img key={index} className="tierlist__content__info__movie__gallery__img" src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} alt="" />
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
            <h2 className="tierlist__content__info__movie__category">Directed by</h2>
            { movie.credits.crew.map( (person, index) =>
              <h3 key={index} className="tierlist__content__info__movie__item"> {person.job === 'Director' ?person.name:null}</h3>
            )}
          </div>
          :null

        }

        <h2 className="tierlist__content__info__movie__category">Release Date</h2>
        <h3 className="tierlist__content__info__movie__item">{movie.info.release_date.substring(0,4)}</h3>  

        <h2 className="tierlist__content__info__movie__category">Runtime</h2>
        <h3 className="tierlist__content__info__movie__item">{movie.info.runtime}'</h3>


        {movie.info.genres.length > 0?
          <div>
            <h2 className="tierlist__content__info__movie__category">Genres</h2>
            { movie.info.genres.map( (genre, index) =>
            <h3 key={index} className="tierlist__content__info__movie__item"> {genre.name}</h3>
            )}
          </div>
          :null          
        }

        {movie.credits?.cast !== undefined?
          <div>
            <h2 className="tierlist__content__info__movie__category">Cast</h2>
            { movie.credits.cast.map( (person, index) =>
              <h3 key={index} className="tierlist__content__info__movie__item"> {(index < 5) ?person.name:null}</h3>
            )}
          </div>
          :null
        }

        {(movie.info.production_companies !== undefined && movie.info.production_companies.length > 0)?
          <div>
            <h2 className="tierlist__content__info__movie__category">Production Companies</h2>
            { movie.info.production_companies.map( (company, index) =>
              <h3 key={index} className="tierlist__content__info__movie__item">{company.name}</h3>
            )}
          </div>
          :null
        }

        {(movie.info.production_countries !== undefined && movie.info.production_countries.length > 0)?
          <div>
            <h2 className="tierlist__content__info__movie__category">Production Countries</h2>
            { movie.info.production_countries.map( (country, index) =>
              <h3 key={index} className="tierlist__content__info__movie__item">{country.name}</h3>
            )}
          </div>
          :null
        }

        </div>
        :null
      }

    </div>
  )


}

function mapStateToProps(state) {
  return {
    movie: state.movie,
    tierlist: state.tierlist,
    items: state.items
  }
}

export default connect(
  mapStateToProps
)(WatchlistInfo);

