import React, { useEffect, useState } from 'react';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import ICard from '../../interfaces/ICard';
import IStatus from '../../interfaces/IStatus';
import IColumn from '../../interfaces/IColumn';
import Column from '../Column';
import Modal from '../Modal';
import { useModal } from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Container, Header, StatusesColumnsContainer, TitleAndSwitch } from './styles';
import { setColumns } from '../../store/slices/columns.slice';
import {  setCards } from '../../store/slices/cards.slice';
import { getCards, getColumns, updateColumns } from '../../store/Actions';

const KanbanBoard: React.FC = () => {

  const { cards } = useAppSelector((state => state.cards));
  const { columns } = useAppSelector((state => state.columns));
  const { visible } = useModal();
  const [isDatedLoad, checkIsDataloaded] = useState<boolean>(false); 

  const dispatch = useAppDispatch();
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
        destination.droppableId === source.droppableId && 
        destination.index === source.index
      ) return;

    const updatedCards: ICard[] = cards.map(card => {
      if (card.id === draggableId) {

        const status: IStatus = destination.droppableId as IStatus;

        return {
          ...card,
          status
        }
      } else return card;
    })

    const sourceColumn: IColumn = columns.find(column => column.id === source.droppableId) as IColumn;
    const destinationColumn: IColumn = columns.find(column => column.id === destination.droppableId) as IColumn;

    //Move cards in the column
    if (sourceColumn === destinationColumn) {

      const newColumnCardsIds = [...destinationColumn.cardsIds];

      newColumnCardsIds.splice(source.index, 1);
      newColumnCardsIds.splice(destination.index, 0, draggableId);
  
      const newDestinationColumn: IColumn = {
        ...destinationColumn,
        cardsIds: newColumnCardsIds
      }
  
      const updatedColumns: IColumn[] = columns.map(column => {
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        else return column;
      }) ;
  
      dispatch(setColumns({ columns: updatedColumns }))
      dispatch(setCards({cards: updatedCards}))
      updateColumns(updatedColumns);
      return;
    }

    //Move cards to another column
    const sourceCardsIds = [...sourceColumn.cardsIds];
    sourceCardsIds.splice(source.index, 1);

    const newSourceColumn: IColumn = {
      ...sourceColumn,
      cardsIds: sourceCardsIds
    }

    const destinationCardsIds = [...destinationColumn.cardsIds];
    destinationCardsIds.splice(destination.index, 0, draggableId);

    const newDestinationColumn: IColumn = {
      ...destinationColumn,
      cardsIds: destinationCardsIds
    }

    const updatedColumns: IColumn[] = columns.map(column => {
      if (column.id === newDestinationColumn.id) return newDestinationColumn;
      if (column.id === newSourceColumn.id) return newSourceColumn;
      else return column;
    }) ;

    dispatch(setColumns({columns: updatedColumns}))
    dispatch(setCards({cards: updatedCards}))
    updateColumns(updatedColumns);
  };

  useEffect(() => {
    async function fetchData() {
      const cards: ICard[] = await getCards();
      const columns: IColumn[] = await getColumns();

      dispatch(setCards(cards));
      dispatch(setColumns(columns));
      checkIsDataloaded(true);
    };
    fetchData();
  }, [isDatedLoad])

  return (
    <>
      <Container>
        <Header>
          <TitleAndSwitch>
            <h1>Kanban Board</h1>
          </TitleAndSwitch>
        </Header>
        
        <StatusesColumnsContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((column, index) => {
              const cardsArray: ICard[] = [];
              column.cardsIds.forEach(cardId => {
                const foundedCard = cards.find(card => {
                  if (card.id === cardId) {
                  }
                  return card.id === cardId
                });
                
                if (foundedCard) cardsArray.push(foundedCard);
              })

              return (
                <Column
                  columnName={column.id} 
                  key={column.id} 
                  index={index}
                  status={column.id} 
                  cards={cardsArray}
                />
            )})}
          </DragDropContext>
        </StatusesColumnsContainer>
      </Container>
      <Modal visible={visible}/>
    </>
  )
}

export default KanbanBoard;