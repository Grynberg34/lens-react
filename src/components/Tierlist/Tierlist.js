import React from "react";
import { connect } from 'react-redux';
import { CheckAuth } from '../../actions';
import { CheckMenu } from '../../actions';
import { GetTierlist } from '../../actions';
import { GetMovieInfo } from '../../actions';
import { ChangeItemTier } from '../../actions';
import Menu from '../Menu';
import TierlistInfo from './TierlistInfo';
import { store } from '../../store';
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../icon/font/flaticon_lens.scss";
import "../../scss/tierlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function Tierlist(props) {

  var { id } = useParams();

  var { user } = useParams();

  var tierlist = props.tierlist;

  var menu = props.menu;

  var items = props.items;

  if (menu !== false) {
    store.dispatch(CheckMenu('red'))
  }

  if (tierlist === null || parseInt(id) !== tierlist?.id) {
    store.dispatch(GetTierlist(props.jwt, id))
  }
  
  if(props.jwt !== null && props.auth !== true) {
    store.dispatch(CheckAuth(props.jwt))
  }

  var auth =  props.auth;

  function getMovieInfo(id, content) {
    store.dispatch(GetMovieInfo(id, content)) 
  }

  function onDragEnd(e) {
    console.log(e)
  }


  if (props.jwt !== null && auth === false) {
    return (
      null
    )
  } else {
    if (auth === true) {
  
      if (tierlist === null) {
        return (
          <div id='tierlist' className="tierlist" style={{backgroundImage: `url('/images/background-tierlist.png')`}}>
            <Menu></Menu>
          </div>
        )
      } else {

        if (tierlist.userId !== parseInt(user)) {
          return (
            <Navigate to="/" />
          )
        } else {
          return (
            <div id='tierlist' className="tierlist" style={{backgroundImage: `url('/images/background-watchlist.png')`}}>
              <Menu></Menu>

              <div className="tierlist__content">
                <Container fluid>
                  <Row>
                    <Col md={8}>
                      <DragDropContext onDragEnd={(e)=> onDragEnd(e)}>
                        <div className="tierlist__content__tiers">


                          {tierlist.tiers.map((tier, index) =>

                            <div className="tierlist__content__tiers__tier" key={index}>
                              <Container fluid>
                                <Row>
                                  <Col md={2}>
                                    <div className="tierlist__content__tiers__tier__title">
                                      <h1 className="tierlist__content__tiers__tier__title__text">{tier.title}</h1>
                                    </div>
                                  </Col>

                                  <Col md={10}>

                                  <Droppable droppableId={`drop-${index+1}`}>
                                    {(provided, snapshot) => (
                                      <div className="tierlist__content__tiers__tier__drop" {...provided.droppableProps} ref={provided.innerRef}>

                                      {provided.placeholder}
                                      </div>              
                                    )}
                                  </Droppable>

                                  </Col>
                                </Row>
                              </Container>
                            </div>

                          )}


                        </div>

                        {
                          items !== null ?
                          <div className="tierlist__content__items">
                              <Droppable droppableId="droppable-1">
                                {(provided, snapshot) => (
                                  <div {...provided.droppableProps} ref={provided.innerRef} >
                                    <Container fluid>
                                      <Row>
                                        {items.map((item, index) =>
                                          <Col md={1} key={item.info.id}>
                                            <Draggable draggableId={item.info.id.toString()}  index={index}>
                                              {(provided) => (  
                                                <div className="tierlist__content__items__item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                  <img className="tierlist__content__items__item__img" src={`https://image.tmdb.org/t/p/original/${item.info.poster_path}`} alt="" />
                                                </div>
                                              )}
                                            </Draggable>
                                          
                                          </Col>
                                        )}

                                      </Row>
                                    </Container>
                                    
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                          </div>
                          :null
                        }
                      </DragDropContext>
                    </Col>

                    <Col md={4}>
                      <TierlistInfo></TierlistInfo>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          )
        }
      }
  
  
    } else {
      return (
        <Navigate to="/" />
      )
    }
  }
  


}

function mapStateToProps(state) {
  return {
    jwt: state.jwt,
    auth: state.auth,
    tierlist: state.tierlist,
    menu: state.menu,
    items: state.items,
    movie: state.movie,
  }
}

export default connect(
  mapStateToProps
)(Tierlist);

