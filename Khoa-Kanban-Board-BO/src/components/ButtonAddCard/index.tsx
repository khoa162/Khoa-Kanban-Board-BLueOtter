import React from 'react';
import { useModal } from '../../hooks/useModal';

import { Container } from './styles';

import { useAppDispatch } from '../../hooks/useRedux';
import { addCardtoColumn } from '../../store/slices/columns.slice';

interface buttonAddProps {
  selectedColumn: string
}

export const ButtonAddCard: React.FC<buttonAddProps> = ({selectedColumn}) => {
    const { toggleVisibility } = useModal();
    const usedispatch = useAppDispatch();

    const handleOpenModal = () => {
      usedispatch(addCardtoColumn(selectedColumn));
      toggleVisibility(undefined)
    }

  return (
    <Container onClick={handleOpenModal}>
        <strong>+</strong>
    </Container>
  );
}