import React, { useContext, useEffect, useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { ThemeContext } from 'styled-components';

import getCategoryBackgroundColor from '../../helpers/getCategoryColor';
import { useModal } from '../../hooks/useModal';
import ICard from '../../interfaces/ICard';
import Badge from '../Icon';
import { FeatureWrapper, CardContainer, DateTitleWrapper } from './styles';
import { getMonthDate } from '../../utils';

interface CardProps {
  card: ICard;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  const theme = useContext(ThemeContext); 

  const [backgroundColor, setBackgroundColor] = useState<string>(theme.colors.primary);

  const { toggleVisibility } = useModal();

  useEffect(() => {
    if (card) {
      const categoryColor = getCategoryBackgroundColor(theme, card.category);
      setBackgroundColor(categoryColor);
    }
  }, [card])

  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <CardContainer 
          onClick={() => toggleVisibility(card)} 
          hideCard={card.hidden}
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
        >
          <FeatureWrapper>
            <Badge category={card.category}/>
          </FeatureWrapper>
          <DateTitleWrapper>
            <h4>{card.title}</h4>
            <span>{getMonthDate()}</span>
          </DateTitleWrapper> 
          <span>{card.description}</span>
        </CardContainer>
      )}
    </Draggable>
  )
}

export default Card;