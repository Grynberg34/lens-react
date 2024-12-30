import React, { useState } from "react";
import { connect } from 'react-redux';
import { store } from '../../../store';
import { SetListTitle } from '../../../actions';
import { SetListDescription } from '../../../actions';
import { SetTierTitle } from '../../../actions';
import { DeleteTier } from '../../../actions';
import { DeleteListItem } from '../../../actions';
import { ChangeTierPosition } from '../../../actions';
import { GetMovieInfo } from '../../../actions';
import { CreateTier } from '../../../actions';
import { CreateList } from '../../../actions';
import "../../../icon/font/flaticon_lens.scss";
import "../../../scss/studiolist-tierlist.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


function StudioListTier(props) {

  var list = props.list;

  var jwt = props.jwt;

  var tiers = props.tiers;

  const [option, setOption] = useState(true);

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
    store.dispatch(ChangeTierPosition(e, tiers)) 
  }
  
  function createList() {
    store.dispatch(CreateList(jwt, list, tiers)) 
  }
  

  function createTier() {
    store.dispatch(CreateTier()) 
  }
  
  function setTierTitle(title, index) {
    store.dispatch(SetTierTitle(title, index, tiers)) 
  }

  function deleteTier(index) {
    store.dispatch(DeleteTier(index)) 
  }

  function getMovie(id) {
    store.dispatch(GetMovieInfo(id, list.uri_content))
  }

  return (
    <div className="studiolist__selection__tierlist">

      <label className="studiolist__selection__tierlist__label">list title</label>
      <input onChange={(e)=> setListTitle(e.target.value)} className="studiolist__selection__tierlist__input" type="text" maxLength="100" />

      {list.title !==null?
        <p className="studiolist__selection__tierlist__length">{100 - list.title.length>0? (100 -list.title.length):'0'} characters left</p>
        :null  
      }

      <label className="studiolist__selection__tierlist__label description">description </label>
      <textarea rows='3' onChange={(e)=> setListDescription(e.target.value)} className="studiolist__selection__tierlist__text" type="text" placeholder="optional" maxLength="500"></textarea>
      
      {list.description !==null?
        <p className="studiolist__selection__tierlist__length">{500 - list.description.length>0? (500 -list.description.length):'0'} characters left</p>
        :null  
      }

      <h1 className="studiolist__selection__tierlist__options"> <span style={{color:option? "#ff9e00": ""}} onClick={()=> setOption(true)} className="studiolist__selection__tierlist__options__option">tiers</span> | <span style={{color:!option? "#ff9e00": ""}} onClick={()=> setOption(false)} className="studiolist__selection__tierlist__options__option">{list.content}</span></h1>

      {
        option ?
        <div className="studiolist__selection__tierlist__tiers">
          <button onClick={()=> createTier()} className="studiolist__selection__tierlist__tiers__add">add tier</button>

          <h2 className="studiolist__selection__tierlist__tiers__subtitle">drag and drop to change order</h2>

          {
            tiers.length > 0?
            <div>
              <DragDropContext onDragEnd={(e)=> onDragEnd(e)}>
                <Droppable droppableId="droppable-1" >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tiers.map((tier, index) =>
                        <Draggable key={index} draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <div className="studiolist__selection__tierlist__tiers__drag" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className="studiolist__selection__tierlist__tiers__tier">
                                <Container fluid>
                                  <Row>
                                    <Col md={2}>
                                    <i  className="studiolist__selection__tierlist__tiers__tier__drag flaticon-drag"></i>
                                    </Col>
                                    <Col md={8}>
                                      <input  onChange={(e)=> setTierTitle(e.target.value, index)} name={`${index}`}  className="studiolist__selection__tierlist__tiers__tier__input" type="text" placeholder="insert title" value={tier} />
                                    </Col>
                                    <Col md={2}>
                                      <i onClick={()=> deleteTier(index)} className="studiolist__selection__tierlist__tiers__tier__delete flaticon-delete"></i>
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
            </div>:
            null
          }

        </div>
        :<div>
          { list.content_items.length > 0?
            <div className="studiolist__selection__tierlist__create">

              <h1 className="studiolist__selection__tierlist__create__title">{list.content} to rank</h1>
              <h2 className="studiolist__selection__tierlist__create__subtitle">click to movie info</h2>

              <div>
                {list.content_items.map((item, index) =>

                  <div onClick={()=> getMovie(item.id)}  key={index} className="studiolist__selection__tierlist__create__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(255,158,0, 0.8) 0%,rgba(255,158,0,0.8) 100%), url('https://image.tmdb.org/t/p/original/${item.backdrop_path}')`}}>
                    <Container fluid>
                      <Row>
                        <Col md={2}>
                        </Col>
                        <Col md={2}>
                          <img className="studiolist__selection__tierlist__create__item__img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
                        </Col>
                        <Col md={6}>
                          {list.content === 'movies'?
                            <h2 className="studiolist__selection__tierlist__create__item__title"> {item.title.length > 30 ? item.title.substring(0,30) + '...': item.title} ({item.release_date !== undefined ?(item.release_date.substring(0,4)):null})</h2>
                            :<h2 className="studiolist__selection__tierlist__create__item__title"> {item.name.length > 30 ? item.name.substring(0,30) + '...': item.name} ({item.first_air_date!== undefined ?(item.first_air_date.substring(0,4)):null})</h2>
                          }
                        </Col>
                        <Col md={2}>
                          <i onClick={()=> deleteMovie(index)} className="studiolist__selection__tierlist__create__item__delete flaticon-delete"></i>
                        </Col>
                      </Row>
                    </Container>
                  </div>

                )}
              </div>              

            </div>
            :null  
          }
        </div>
      }

      { (list.content_items.length > 0 && tiers.length > 0)?
        <button onClick={()=> createList()} className="studiolist__selection__tierlist__button">create tierlist</button>
        :null  
      }

    </div>
  )

}

function mapStateToProps(state) {
  return {
    list: state.list,
    jwt: state.jwt,
    tiers: state.tiers
  }
}

export default connect(
  mapStateToProps
)(StudioListTier);

