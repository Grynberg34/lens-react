import React from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { SetListTitle } from '../../../actions';
import { SetListDescription } from '../../../actions';
import { DeleteListItem } from '../../../actions';
import { ChangeItemPosition } from '../../../actions';
import { CreateList } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist-watchlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


function StudioListWatch(props) {

  var list = props.list;

  var jwt = props.jwt;

  function setListTitle(title) {
    store.dispatch(SetListTitle(title)) 
  }

  function setListDescription(text) {
    store.dispatch(SetListDescription(text)) 
  }

  function deleteMovie(index) {
    store.dispatch(DeleteListItem(index)) 
  }

  function onDragEnd(e) {
    store.dispatch(ChangeItemPosition(e, list.content_items)) 
  }

  function createList() {
    store.dispatch(CreateList(jwt, list)) 
  }

  return (
    <div className="studiolist__selection__watchlist">

      <label className="studiolist__selection__watchlist__label">list title</label>
      <input onChange={(e)=> setListTitle(e.target.value)} className="studiolist__selection__watchlist__input" type="text" maxLength="100" />

      {list.title !==null?
        <p className="studiolist__selection__watchlist__length">{100 - list.title.length>0? (100 -list.title.length):'0'} characters left</p>
        :null  
      }

      <label className="studiolist__selection__watchlist__label description">description </label>
      <textarea rows='3' onChange={(e)=> setListDescription(e.target.value)} className="studiolist__selection__watchlist__text" type="text" placeholder="optional" maxLength="500"></textarea>
      
      {list.description !==null?
        <p className="studiolist__selection__watchlist__length">{500 - list.description.length>0? (500 -list.description.length):'0'} characters left</p>
        :null  
      }

      { list.content_items.length > 0?
        <div className="studiolist__selection__watchlist__create">

          <h1 className="studiolist__selection__watchlist__create__title">watchlist</h1>
          <h2 className="studiolist__selection__watchlist__create__subtitle">drag and drop to change order</h2>

          <DragDropContext onDragEnd={(e)=> onDragEnd(e)}>
            <Droppable droppableId="droppable-1" >
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {list.content_items.map((item, index) =>
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div className="studiolist__selection__watchlist__create__drag" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="studiolist__selection__watchlist__create__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(255,158,0, 0.8) 0%,rgba(255,158,0,0.8) 100%), url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`}}>
                            <Container fluid>
                              <Row>
                                <Col md={2}>
                                <i  className="studiolist__selection__watchlist__create__item__drag flaticon-drag"></i>
                                </Col>
                                <Col md={2}>
                                  <img className="studiolist__selection__watchlist__create__item__img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
                                </Col>
                                <Col md={6}>
                                {list.content === 'movies'?
                                  <h2 className="studiolist__selection__watchlist__create__item__title"> {item.title.length > 30 ? item.title.substring(0,30) + '...': item.title} ({item.release_date !== undefined ?(item.release_date.substring(0,4)):null})</h2>
                                  :<h2 className="studiolist__selection__watchlist__create__item__title"> {item.name.length > 30 ? item.name.substring(0,30) + '...': item.name} ({item.first_air_date!== undefined ?(item.first_air_date.substring(0,4)):null})</h2>
                                }
                                </Col>
                                <Col md={2}>
                                  <i onClick={()=> deleteMovie(index)} className="studiolist__selection__watchlist__create__item__delete flaticon-delete"></i>
                                </Col>
                              </Row>
                            </Container>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </div>              
              )}
            </Droppable>
          </DragDropContext>
          
        </div>
        :null  
      }

      { list.content_items.length > 0?
        <button onClick={()=> createList()} className="studiolist__selection__watchlist__button">create watchlist</button>
        :null  
      }

    </div>
  )

}

function mapStateToProps(state) {
  return {
    list: state.list,
    jwt: state.jwt
  }
}

export default connect(
  mapStateToProps
)(StudioListWatch);

