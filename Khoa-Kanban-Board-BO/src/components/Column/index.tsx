import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import ICard from '../../interfaces/ICard';
import IStatus from '../../interfaces/IStatus';
import Card from '../Card';
import { CardsList, Container } from './styles';
import { ButtonAddCard } from '../ButtonAddCard';

interface ColumnProps {
  columnName: string;
  status: IStatus;
  cards: ICard[];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ columnName, status, cards, index }) => {

  const columnColor = (clName: string): string => {
    let clColor: string = ''
    switch(clName) {
      case 'Pending Task':
        clColor = '#1b5379';
        break;
      case 'Ongoing Task':
        clColor = '#106254';
        break;
      case 'Completed':
        clColor = '#52117f';
        break;
      case 'In Development':
        clColor = '#70451b';
        break;
      case 'Live in Build':
        clColor = '#6e6c6d';
        break;
      default:
        clColor = 'white'
    };
    return clColor;
  };

  return (
    <Container columnName={columnColor(columnName)} isFirstColumn={index === 0}>
      <h2>{status}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <CardsList ref={provided.innerRef} {...provided.droppableProps}>
            {cards
              .filter(card => {
                status = card.status;
                return card.status === status
              })
              .map((card, index) => <Card key={card.id} card={card} index={index}/>)
            }
            {provided.placeholder}
            <ButtonAddCard selectedColumn={columnName}/>
          </CardsList>
        )}
        </Droppable>
    </Container>
  )
}

export default Column;